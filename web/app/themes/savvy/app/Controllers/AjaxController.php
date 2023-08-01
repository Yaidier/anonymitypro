<?php 

namespace SavvyTheme\Controllers;

/**
 * The Popup Controller Class
 *
 * @author Yaidier Perez
 * */

use SavvyTheme\Resources\Utilities;
use SavvyTheme\Controllers\StructuredDataController;
use SavvyTheme\Controllers\MultilangugeController;

class AjaxController {

    public static function init(){
        $ajax_hanlders = [
            'cache_hanlder',
            'lrc_handler',
            'gtapi_hanlder',
            'get_schema_status',
            'article_score_handler',
        ];

        foreach ( $ajax_hanlders as $ajax_hanlder ) {
            add_action( 'wp_ajax_nopriv_' . $ajax_hanlder, [self::class, $ajax_hanlder] );
            add_action( 'wp_ajax_' . $ajax_hanlder, [self::class, $ajax_hanlder] );
        }
    }

    public static function cache_hanlder() {
        Utilities::flush_all_cache_files();

        $admin_notice = Utilities::ps_admin_notice( 'success', 'Privacysavvy Cache App', 'Cache purged successfully' );

        $response = [
            'status'    => 'success',
            'callback'  => 'insert_notice',
            'content'   => $admin_notice,
        ];

        wp_send_json( $response );
    }

    public static function article_score_handler(){
        $post_id    = (int) $_GET['post_id'] ?? false;
        $vote_value = $_GET['vote'] ?? false;

        if( !$post_id ){
            $response = [
                'status'    => 'error',
                'content'   => 'Post Id is missing',
            ];
    
            wp_send_json( $response );
        }

        if( !$vote_value ){
            $response = [
                'status'    => 'error',
                'content'   => 'Vote value is missing',
            ];
    
            wp_send_json( $response );
        }

        $article_score = Utilities::set_article_score_data( $post_id, $vote_value );

        $response = [
            'status'    => 'success',
            'values'    => $article_score,
        ];

        wp_send_json( $response );
    }

    public static function get_schema_status() {
        $post_id        = $_GET['post_id'] ?? false;
        $schema_type    = $_GET['schema_type'] ?? false;

        if( !$post_id ){
            $response = [
                'status'    => 'error',
                'content'   =>  'Post Id is missing',
            ];
    
            wp_send_json( $response );
        }

        if( !$schema_type ){
            $response = [
                'status'    => 'error',
                'content'   =>  'Schema type is missing',
            ];
    
            wp_send_json( $response );
        }

        $review_schema_data = get_post_meta( $post_id, 'ps_schema_' . $schema_type , true );
        $use_new_banner     = get_field( 'use_new_banner', $post_id );

        if( !is_array( $review_schema_data ) || !$use_new_banner ) {
            $response = [
                'status'    => 'error',
                'message'   => 'Schema is not ON for this post',
            ];
    
            wp_send_json( $response );
        }

        if( array_key_exists( 'status', $review_schema_data ) && $review_schema_data['status'] == 'error' ){
            /**
             * Prepare error message
             */
            $error_message  = StructuredDataController::get_schema_errors( $review_schema_data );
            $notice_html    = Utilities::ps_admin_notice( 'error', 'Review Schema', $error_message, false );

        }
        else {
            $notice_html = Utilities::ps_admin_notice( 'success', 'Review Schema', 'All good!', true );
        }

        $response = [
            'status'    => 'success',
            'content'   =>  $notice_html,
        ];

        wp_send_json( $response );
    }

    public static function gtapi_hanlder() {
        $post_id        = $_GET['post_id']              ?? false;
        $target_lang    = $_GET['target_lang']          ?? false;
        $options        = $_GET['translations_options'] ?? false;

        if ( !$target_lang || !$post_id ) {
            $response = [
                'status'    => 'failure',
                'content'   =>  'No resources to get',
            ];

            wp_send_json( $response );
        }

        $options    = explode( ',', $options );
        $response   = MultilangugeController::translate_post( $post_id, $target_lang, $options );

        if( !$response || is_wp_error( $response ) || isset( $response['error'] ) ){
            $response = [
                'status'    => 'error',
                'message'   => $response,
            ];
        }
        else {
            $response = [
                'status'    => 'success',
                'message'   => 'Post Translated Successfully',
            ];
        }

        wp_send_json( $response );
    }

    public static function lrc_handler() {
        $resources  = $_GET['resources']    ?? false;
        $post_id    = $_GET['post_id']      ?? false;

        if ( !$resources || !$post_id ) {
            $response = [
                'satus'     => 'failure',
                'content'   =>  'No resources to get',
            ];

            wp_send_json( $response );
        }
        
        $resources  = stripslashes($resources);
        $resources  = json_decode( $resources, true );
        $response   = [];
        $args       = [
            'post_id' => $post_id,
        ];
        
        foreach( $resources as $resource ){
            $args           = array_merge( $args, $resource );
            $data           = call_user_func( array( 'SavvyTheme\Controllers\AjaxController', 'get_' . $resource['resource_name'] ), $args );
            $response[]     = $data;
        }

        wp_send_json( $response );
    }

    public static function get_lrc_popups( $args ) {
        $template                   = $args['include_popup'] ?? false;
        $post_type                  = get_post( $args['post_id'] )->post_type;
        $current_lang               = $args['current_lang'] ?? 'en';
        $context['popup_content']   = Utilities::get_popup_content( $post_type, $current_lang );

        ob_start();
        \Timber::render('popups/' . $template, $context);
        $content = ob_get_clean();

        $response = [
            'status'        => 'success',
            'data'          => $content,
            'callback'      => 'popup_inserter',
            'callback_args' => 'body #ps-main,',
        ];

        return $response;
    }

    public static function get_lrc_last_sections( $args ){
        $post_id        = (int)$args['post_id'];
        $post_content   = get_post_meta( $post_id, 'lrc_last_sections', true );

        $post_content   = str_replace( '<!--{{ldl_last_sections}}', '', $post_content );
        $post_content   = str_replace( '{{ldl_last_sections}}-->', '', $post_content );

        $response = [
            'status'        => 'success',
            'data'          => $post_content,
            'callback'      => 'lrc_post_last_sections',
            'callback_args' => 'body #ps-lrc_last_sections,',
        ];

        return $response;
    }
}