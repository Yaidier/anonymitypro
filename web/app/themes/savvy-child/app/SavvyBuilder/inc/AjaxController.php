<?php

namespace NBuilder;

use NBuilder\App;


class AjaxController {
    public static function init(){
        $ajax_hanlders = [
            'save_post',
            'uof_save_block',
            'create_block',
        ];

        foreach ( $ajax_hanlders as $ajax_hanlder ) {
            add_action( 'wp_ajax_nopriv_' . $ajax_hanlder, [self::class, $ajax_hanlder] );
            add_action( 'wp_ajax_' . $ajax_hanlder, [self::class, $ajax_hanlder] );
        }
    }

    public static function create_block() {
        $post_id    = $_GET['post_id'] ?? false;
        $base_id    = $_GET['base_id'] ?? false;
        $block_type = $_GET['block_type'] ?? false;

        if( !$post_id || !$base_id || !$block_type ){
            $response = [
                'status' => 'error',
            ];
    
            wp_send_json( $response ); 
        }

        /**
         * Get all blocks regsitered.
         */
        $blocks = App::instance()->blocks_controller->noder_blocks;

        /**
         * Create a new instance of the same block type.
         */
        $block          = new $blocks[$block_type];
        $block_id       = $block->set_block_id();
        $block_html     = $block->pre_render( $block_id );

        $block->public_register_controls();
        $block->render_controls( $base_id );

        $editor_controls_html   = App::instance()->editor->render_blocks_controls();
        $styles_data            = App::instance()->styles_data[$block_id];

        $response = [
            'status'                    => 'success',
            'callback'                  => 'insert_block',
            'block_id'                  => $block_id,
            'editor_controls_html'      => $editor_controls_html,
            'block_html'                => $block_html,
            'styles_data'               => $styles_data
        ];

        wp_send_json( $response );
    }

    public static function uof_save_block() {
        $block_data = $_GET['block_data']   ?? false;
        $block_id   = $_GET['block_id']     ?? false;
        $block_type = $_GET['block_type']   ?? false;

        if( !$block_data || !$block_id || !$block_type ){
            $response = [
                'status' => 'error',
            ];
    
            wp_send_json( $response ); 
        }

        $block_data = json_decode( stripslashes( $block_data ), true );

        /**
         * Get all blocks regsitered.
         */
        $blocks = App::instance()->blocks_controller->noder_blocks;

        /**
         * Create a new instance of the same block type.
         */
        $block = new $blocks[$block_type];

        /**
         * Render the content of the new instance with the content we 
         * provided.
         */
        $html_content = $block->get_from_ajax( $block_id, $block_data[$block_id]['controls_values'] );

        $response = [
            'status' => 'success',
            'callback' => 'update_block',
            'block_id' => $block_id,
            'html_content' => $html_content,
        ];

        wp_send_json( $response );
    }

    public static function save_post() {
        $noders_data    = $_GET['noder_data'] ?? false;
        $styles_data    = $_GET['styles_data'] ?? false;
        $post_id        = $_GET['post_id'] ?? false;

        $noders_data    = stripslashes( $noders_data );
        $noders_data    = json_decode( $noders_data, true );
        $styles_data    = stripslashes( $styles_data );
        $styles_data    = json_decode( $styles_data, true );

        $base_ids       = [];

        foreach( $noders_data as $base_id => $noder_elements ){
            $base_ids[] = $base_id;
            update_option( 'nb_data_' . $base_id , $noder_elements );
        }

        update_option( 'nb_style_data_post_' . $post_id, $styles_data );

        $response = [
            'status' => 'success',
        ];

        wp_send_json( $response );
    }
}