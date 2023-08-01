<?php

namespace NBuilder\Blocks;

use NBuilder\App;
use NBuilder\Controls\Controls;

class BaseBlock {

    public $block_id;
    private $controls = [];
    private $instances = [];
    private $settings = null;

    public function __construct(){

    }

    public function get_name() {
        
    }

    public function get_title() {
        
    }

    public function start_controls_section( $id, $args ) {
        if( !isset( $this->controls[$this->block_id] ) ){
            $this->controls[$this->block_id] = [];
        }

        $args['controls'] = [];
        $this->controls[$this->block_id][$id] = $args;
    }

    protected function add_control( $id, $args ) {
        /**
         * Attach block id to the control.
         */
        $args['block_id'] = $this->block_id;

        /**
         * Add the control id.
         */
        $args['control_id'] = $id;

        /**
         * Point to the last element of the array
         */
        end( $this->controls[$this->block_id] );
        $this->controls[$this->block_id][key( $this->controls[$this->block_id] )]['controls'][] = $args;
        reset( $this->controls[$this->block_id] );
    }

    protected function add_responsive_control( $id, $args ) {
        /**
         * Attach block id to the control.
         */
        $args['block_id'] = $this->block_id;

        /**
         * Add the control id.
         */
        $args['control_id'] = $id;

        /**
         * Add responsive flag.
         */
        $args['is_responsive'] = true;

        /**
         * Point to the last element of the array
         */
        end( $this->controls[$this->block_id] );
        $this->controls[$this->block_id][key( $this->controls[$this->block_id] )]['controls'][] = $args;
        reset( $this->controls[$this->block_id] );
    }
    
    public function end_controls_section() {
        
    }

    protected function get_settings_for_display() {
        if( $this->settings ){
            return $this->settings;
        }

        $post_data = App::instance()::$post_data;

        if( $post_data )  {
            $block_data = $post_data[$this->block_id] ?? [];
        }
        else {
            $block_data = [];
        }

        foreach( $this->controls[$this->block_id] as $section ){
            if( !isset( $section['controls'] ) ){
                continue;
            }

            foreach( $section['controls'] as $control ) {
                if( !array_key_exists( $control['control_id'], $block_data ) ){
                    $block_data[$control['control_id']] = '';
                }
            }
        }

        return $block_data;
    }

    protected function render() {

    }

    public function public_register_controls(){
        $this->register_controls();
    }

    protected function register_controls() {
    }

    public function render_controls( string $base_id = '', array $settings = [] ) {
        foreach ( $this->controls[$this->block_id] as $control_data ) {
            $tab                = $control_data['type'] ?? '';
            $tab                = $tab ? $tab : 'content';
            $style_outout       = '';
            
            /**
             * Open Block Wrap
             */
            $control_wrap = '<div class="nb-controls_wrap nb_tab_'. $tab .'" data-baseid="'. $base_id .'" data-blocktype="'. $this->get_name() .'" data-blockid="'. $this->block_id .'">';

            foreach( $control_data['controls'] as $control ){
                $value              = $settings[ $control[ 'control_id' ] ]['desktop']['value'] ?? ( $control[ 'default' ] ?? '' );
                $value_tablet       = $settings[ $control[ 'control_id' ] ]['tablet']['value'] ?? ( $control[ 'tablet_default' ] ?? $value );
                $value_mobile       = $settings[ $control[ 'control_id' ] ]['mobile']['value'] ?? ( $control[ 'mobile_default' ] ?? $value );
 
                if( isset( $control['selectors'] ) ){
                    foreach( $control['selectors'] as $selector => $property ){
                        $selector_render = str_replace( '{{WRAPPER}}', '.nb-base div.nb-block.' . $this->block_id, $selector );

                        $desktop = [
                            'value' => $value,
                        ];

                        $tablet = [
                            'value' => $value_tablet,
                        ];

                        $mobile = [
                            'value' => $value_mobile,
                        ];

                        App::instance()->styles_data[$this->block_id][$control[ 'control_id' ]] = [
                            'selector'          => $selector_render,
                            'property'          => $property,
                            'desktop'           => $desktop,
                            'tablet'            => $tablet,
                            'mobile'            => $mobile,
                            'is_responsive'     => $control['is_responsive'] ?? false,
                        ];
                    }
                }

                $control_wrap .= Controls::render( $control, $value );
            }

            /**
             * Close Block Wrap
             */
            $control_wrap .= '</div>';

            App::instance()->editor->add_rendered_block_controls_to_editor( $control_wrap, $tab );
        }
    }

    public function get_from_ajax( $block_id, $settings ){
        $this->settings = $settings;

        return $this->pre_render( $block_id, true );
    }

    public function pre_render( $block_id, bool $is_preselected = false ) {
        $extra_classes = $is_preselected ? 'nb-block_selected ' : '';
        $extra_classes .= ( $this->get_name() == 'nb_columns_block' ) ? 'nb-base ' : '';

        ob_start();

        /**
         * The block wrapper opening tag
         */
        echo '<div id="" class="nb-block '. $extra_classes . ' ' . $block_id .'" data-blocktype="'. $this->get_name() .'" data-blocktitle="'. $this->get_title() .'" data-blockid="'. $block_id .'" tabindex="0">';

        /**
         * If we load the editor, 
         * then insert the edit button.
         */
        if( App::instance()->load_editor ){
            echo '<div class="nb-edit_btn"></div>';
        }

        $this->render();
        
        /**
         * We do not close the tag for the columns block,
         * as it contains other blocks inside.
         */
        if( 'nb_columns_block' !== $this->get_name() ) {
            echo '</div>';
        }

        $contents = ob_get_clean();

        return $contents;
    }

    public function set_block_id( $atts = [] ) {
        $this->block_id = $this->get_name() . '_' . ( $atts['id'] ?? uniqid() );

        return $this->block_id;
    }


    public function render_from_wp_block( string $base_id, string $block_id, array $settings ) {
        $this->block_id     = $block_id;
        $this->settings     = $settings;
        $this->instances[]  = $this->block_id;

        $this->register_controls();

        /**
         * If user is admin, then load the Editor.
         */
        if( App::instance()->load_editor ){
            App::instance()->editor->load_editor();
            $this->render_controls( $base_id, $settings );
        }

        $contents = $this->pre_render( $this->block_id );

        return $contents;
    }

    public function render_shortcode( $atts ) {
        $this->set_block_id( $atts );
        $this->instances[] = $this->block_id;
        $this->register_controls();

        /**
         * If user is admin, then load the Editor.
         */
        if( App::instance()->load_editor ){
            App::instance()->editor->load_editor();
            $this->render_controls();
        }

        $contents = $this->pre_render( $this->block_id );

        return $contents;
    }

    public function render_template( array $context = [], string $template_name = '' ) {
        $template_name = $template_name ?: 'savvy-blocks/' . $this->get_name() . '.twig';
        // $template_name = $template_name ?: $this->get_name() . '.twig';

        // return App::instance()->twig->render( $template_name, $context );
        return \Timber::render( $template_name, $context );
    }
}