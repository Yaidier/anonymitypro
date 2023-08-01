<?php

namespace NBuilder\Editor;

use NBuilder\App;

class Editor {

    public $editor_loaded = false;
    public $rendered_blocks_controls = [];

    public function __construct(){
        // $this->editor_loaded = true;
        
        $rendered_blocks_controls['content'] = [];
        $rendered_blocks_controls['style'] = [];
        $rendered_blocks_controls['advanced'] = [];

        // $this->load_editor();
    }

    public function load_editor() {
        if( $this->editor_loaded ){
            return;
        }

        $this->editor_loaded = true;

        /**
         * Add a class to the body
         */
        add_filter( 'body_class', function( $classes ) {
            $classes[] = 'nb-editor_wrap';

            return $classes;
        } );
        
        add_action( 'wp_footer', function() {
            echo $this->render();
        }, 1 );
    }

    public function add_rendered_block_controls_to_editor( string $rendered_block_control, $tab ) {
        $this->rendered_blocks_controls[$tab][] = $rendered_block_control;
    }

    public function get_blocks_for_picker() {
        $blocks         = App::instance()->blocks_controller->noder_blocks;
        $html_output    = '';


        foreach( $blocks as $block_name => $block_object ){
            $html_output .= '<div class="nb-editor_block_picker" data-blocktype="'. $block_name .'"><i></i><span>'. $block_object->get_title() .'</span></div>';
        }

        return $html_output;
    }

    public function get_rendered_controls() {
        ob_start();
        $this->render_controls();
        return ob_get_clean();
    }

    public function render_tabs_menues() {
        $output = '';

        // if( empty( $this->rendered_blocks_controls ) ){
            $output .= '<a data-tab="content"><span class="dashicons dashicons-edit"></span></a>';
            $output .= '<a data-tab="style"><span class="dashicons dashicons-art"></span></a>';

        //     return $output;
        // }

        // foreach( array_keys( $this->rendered_blocks_controls ) as $tab ){
        //     $output .= '<a href="#" data-tab="'. $tab .'">' . $tab . '</a>';
        // }

        return $output;
    } 

    public function render_blocks_controls() {
        $output = '';

        if( empty( $this->rendered_blocks_controls ) ){
            $output .= '<div class="nb-editor_tab_content nb-editor_tab_content_content nb_display_block"></div>';
            $output .= '<div class="nb-editor_tab_content nb-editor_tab_content_style"></div>';

            return $output;
        }

        foreach( $this->rendered_blocks_controls as $tab => $controls ){
            $default_display = ( $tab == 'content' ) ? ' nb_display_block ' : '';

            $output .= '<div class="nb-editor_tab_content nb-editor_tab_content_'. $tab . $default_display .'" >';

            foreach ( $controls as $control ) {
                $output .= $control;
            }
            
            $output .= '</div>';
        }

        return $output;
    }

    public function render_controls() {
        echo '<div class="nb-editor_tab_nav_menu">';
        echo $this->render_tabs_menues();
        echo '</div>';

        echo $this->render_blocks_controls();
    }

    public function render() {

        $blocks_for_picker = $this->get_blocks_for_picker();

        ob_start();

        /**
         * Open editor wrap.
         */
        echo '<div class="nb-editor">';

        /**
         * Reszie bar
         */
        echo '<div class="nb-editor_resize_bar"></div>';

        /**
         * Hide editor button
         */
        echo '<button class="nb-editor_hide_btn">';
        echo '<span class="dashicons dashicons-arrow-left-alt2"></span>';
        echo '<span class="dashicons dashicons-arrow-right-alt2"></span>';
        echo '</button>';

        /**
         * Editor Title
         */
        echo '<div class="nb-editor_header"><p>Savvy Builder</p><span class="nb-editor_blocks_picker_btn dashicons dashicons-menu-alt3"></span></div>';

        /**
         * Open editor body wrap
         */
        echo '<div class="nb-editor_body">';

        /**
         * Blocks Picker
         */
        echo '<div class="nb-editor_blocks_picker">';
        echo $blocks_for_picker;
        echo '</div>';

        $this->render_controls();

        echo '<div class="nb-editor_temp">';
        echo '</div>';

        /**
         * Bottom Section of the editor
         */
        echo '<div class="nb-editor_bottom_wrap">';
        echo '<button class="nb-editor_btn_update">Save Changes</button>';
        echo '</div>';


        /**
         * Close editor body wrap.
         */
        echo '</div>';

        /**
         * Close editor wrap.
         */
        echo '</div>';


        $contents = ob_get_clean();

        return $contents;
    }
}