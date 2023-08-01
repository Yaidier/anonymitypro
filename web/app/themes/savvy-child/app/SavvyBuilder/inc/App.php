<?php

namespace NBuilder;

use NBuilder\BlocksController;
use NBuilder\Editor\Editor;
use NBuilder\Blocks\BaseBlock;

class App {
	/**
	 * Instance.
	 *
	 * Holds the plugin instance.
	 */
	public static $instance = null;
	public static $post_data = null;
	
	public $editor;
	public $twig;
	public $styles_data = [];
	public $controls_controller;
	public $blocks_controller;
	public $load_editor = false;

	/**
	 * Clone.
	 *
	 * Disable class cloning and throw an error on object clone.
	 */
	public function __clone() {
		die;
	}

	/**
	 * Wakeup.
	 *
	 * Disable unserializing of the class.
	 */
	public function __wakeup() {
		die;
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();

			/**
			 * Nodebuilder loaded.
			 */
			do_action( 'nodebuilder/loaded' );
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'init' ], 0 );
	}

	private function get_post_data () {
		if( self::$post_data ) {
			return;
		}

		add_action( 'wp', function() {
			global $post;

			if( !$post ) {
				return;
			}
	
			$post_data = get_option( 'nb_post_data_' . $post->ID );

			self::$post_data = $post_data;
		} );
	}

	/**
	 * Dependencies
	 */
	private function dependencies(){
		add_action( 'wp_enqueue_scripts', function() {
			global $post;

			wp_enqueue_style( 'nb_front_styles', 	NODE_BUILDER_URI . 'public/css/nb-front.css', [], time() );
		} );
	}

	/**
	 * Load editor dependencies
	 */
	private function editor_dependencies(){
		if( !$this->load_editor ){
			return;
		}

		add_action( 'wp_enqueue_scripts', function() {
			global $post;

			wp_enqueue_style( 		'nb_editor_styles', NODE_BUILDER_URI . 'public/css/nb-editor.css', [], time() );
			wp_enqueue_script( 		'nb_editor_script', NODE_BUILDER_URI . 'public/js/nb-editor.js', [], time(), true );
			wp_add_inline_script( 	'nb_editor_script', 'let nb_ajax_var = ' . json_encode( [ 'url' => admin_url( 'admin-ajax.php' ), 'post_id' => $post->ID ] ) .';' );

			/**
			 * Font Awesome
			 */
			wp_enqueue_style( 'nb_fontawesome', NODE_BUILDER_URI . 'node_modules/@fortawesome/fontawesome-free/css/fontawesome.css', [], );
			wp_enqueue_style( 'nb_fontawesome_brands', NODE_BUILDER_URI . 'node_modules/@fortawesome/fontawesome-free/css/brands.css', [], time() );
			wp_enqueue_style( 'nb_fontawesome_solid', NODE_BUILDER_URI . 'node_modules/@fortawesome/fontawesome-free/css/solid.css', [], time() );

		} );
	}

	private function load_dependencies() {
		$this->editor_dependencies();
		// $this->dependencies();
	}

	private function define_load_editor() {
		if( !is_user_logged_in() ){
            return;
        }

        if( !current_user_can( 'administrator' ) ){
            return;
        }

		$this->load_editor = true;
	}

	public function recursive_renderer( $base_id, $blocks, $noder_structure ) {

		$output = '';

		foreach( $noder_structure as $noder_element ){
			$block_type = $noder_element['block_type'];

			if( !$blocks[$block_type] instanceof BaseBlock ) {
				continue;
			}

			$noder_block = new $blocks[$block_type] ?? null;

			if( !$noder_block ){
				continue;
			}

			if( 'nb_columns_block' == $block_type ){
				$html_content = $noder_block->render_from_wp_block( $base_id, $noder_element['block_id'], $noder_element['controls_values'] );

				if( isset( $noder_element['children'] ) && !empty( $noder_element['children'] ) ){
					$html_content .= App::instance()->recursive_renderer( $base_id, $blocks, $noder_element['children'] );
				}

				$html_content .= '</div>';
			}
			else {
				$html_content = $noder_block->render_from_wp_block( $base_id, $noder_element['block_id'], $noder_element['controls_values'] );
			}


			$output .= $html_content;
		}

		return $output;
	}

	public function render_noder_structure( $base_id ){
		$noder_structure 	= get_option( 'nb_data_' . $base_id ) ?: [];
		$blocks 			= App::instance()->blocks_controller->noder_blocks;

		$output 			= App::instance()->recursive_renderer( $base_id, $blocks, $noder_structure );

		echo $output;

		ob_start();

		/**
		 * Debug
		*/
		echo '<pre>';
		var_dump($noder_structure);
		echo '</pre>';

		return ob_get_clean();
	}

	public function test() {
		add_action( 'init', function() {
			register_block_type( __DIR__ . '/NodeBuilderBlock/build' );
			// register_block_type( __DIR__ . '/block-model/build' );
		});
	}

	public function render_inline_style($styles_data) {
		$html = '';

		foreach( $styles_data as $block_id => $controls ){
			$html .= '<style class="nb-style-'. $block_id .'">';

			foreach ( $controls as $control_id => $control_data ) {
				$html .= $control_data['selector'] . '{' . str_replace( '{{VALUE}}', $control_data['desktop']['value'], $control_data['property'] ) . '}';
			}

			if( isset( $control_data['tablet'] ) ){
				$html .= '@media screen and (max-width: 1024px){' . $control_data['selector'] . '{' . str_replace( '{{VALUE}}', $control_data['tablet']['value'], $control_data['property'] ) . '}}';
			}

			if( isset( $control_data['mobile'] ) ){
				$html .= '@media screen and (max-width: 767px){' . $control_data['selector'] . '{' . str_replace( '{{VALUE}}', $control_data['mobile']['value'], $control_data['property'] ) . '}}';
			}
		}

		return $html;
	}

	public function preload_styles(){
		add_action( 'wp_head', function() {
			global $post;

			if( !$post ){
				return;
			}

			$styles_data = get_option( 'nb_style_data_post_' . $post->ID );

			if( !$styles_data ){
				return;
			}

			echo self::render_inline_style( $styles_data );
		});
	}

	public function send_styles_data() {
		add_action( 'wp_footer', function() {
			$json_data = json_encode( App::instance()->styles_data );

			echo '<script>const noder_json_styles = ' . $json_data . '</script>';
		} );
	}

	private function twig_bootstrap() {
		$loader 		= new \Twig\Loader\FilesystemLoader( SAVVYCHILD_THEME_DIR . '/templates/savvy-blocks/' );
		$this->twig 	= new \Twig\Environment( $loader );
	}

	public function init() {
		$this->test();
		$this->preload_styles();
		$this->send_styles_data();
		$this->twig_bootstrap();

		AjaxController::init();
		$this->define_load_editor();
		$this->load_dependencies();
		$this->get_post_data ();

		if( App::instance()->load_editor ){
			$this->editor = new Editor();
			$this->editor->load_editor();
		}

		$this->blocks_controller = new BlocksController();
	}
}
