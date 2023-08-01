<?php

namespace SavvyTheme\Controllers;

use SavvyTheme\Resources\Utilities;

/**
 * The Backend Controller Class
 *
 * @author Yaidier Perez
 * */

class BackendController {

    public static function init() {
        if ( is_admin() ) {
            // self::remove_menu_pages();
            self::add_styles();
            self::add_scripts();
            self::facts_checked_status_on_post_list();
            self::set_on_production_warning_banner();
            self::admin_bar_manager();
        }
    }

    public static function admin_bar_manager() {
        add_action('admin_bar_menu', function( $admin_bar ) {
            $admin_bar->add_menu( array( 
                'id'=>'ps-cache_purge',
                'title'=>'<i class="ps-flush_cache_icon"></i>Cache Purge',
                'href'=>'#' ) );
        }, 100);
    }

    public static function set_on_production_warning_banner() {

        if( 'production' != WP_ENV ){
            return;
        }
        
        if( 'yaidierperez' != wp_get_current_user()->data->user_nicename ){
            return;
        }

        add_action( 'admin_head', function() {
            echo '<div class="ps-admin_on_prod_warning">On Production!</div>';
        } );
    }

    static public function facts_checked_status_on_post_list() {
        add_filter( 'manage_posts_columns', function( $columns, $post_type ) {
            /**
             * We don not apply this on 'news' as we do not have 'Facts Checked' there
             */
            if( 'post' === $post_type ){
                return $columns;
            }

            $columns = array_merge(array_slice($columns, 0, 7), [ 'ff_checked' => '<span title="Facts Checked Status" style="color: #444444;" class="dashicons dashicons-businessman"></span>' ], array_slice($columns, 7));

            if( array_key_exists( 'tags', $columns ) ){
                unset( $columns['tags'] );

            }
            
            return $columns;
        }, 10, 2 );

        add_action( 'manage_posts_custom_column', function( $column_id, $post_id ) {
            if( $column_id != 'ff_checked' ){
                return;
            }

            $fc_raw_data    = Utilities::get_facts_checked( $post_id );
            $fc_data        = Utilities::converts_facts_checked_to_reviewedby( $fc_raw_data );

            if( empty( $fc_raw_data ) ) {
                echo '<span style="color:#9ba2a6;" title="Facts Checked not Set" class="dashicons dashicons-info"></span>';
                
                return;
            }

            if( !empty( $fc_data['missing_fields'] ) ){
                echo '<span style="color:#dba617;" title="Some fields missing on the Facts Checked" class="dashicons dashicons-warning"></span>';
                return;
            }
                
            echo '<span style="color:#00a32a;" title="Facts Checked Ok" class="dashicons dashicons-yes-alt"></span>';

        }, 10, 2 );

    }

    public static function enqueue_styles() {
        wp_enqueue_style( 'savvy-styles-admin', SAVVY_THEME_DIR_URI . '/assets/css/savvy-admin.css', array(), time() );
    }

    public static function enqueue_scripts() {
        global $post;

        wp_enqueue_script( 'savvy-scripts-admin', SAVVY_THEME_DIR_URI . '/assets/js/savvy-admin.js', array(), time() );
        wp_add_inline_script( 'savvy-scripts-admin', 'let ajax_var = ' . json_encode( [ 'url' => admin_url( 'admin-ajax.php' ) ] ) .';' );
        
        if( $post ) {
            wp_add_inline_script( 'savvy-scripts-admin', 'const ps_admin_post_id = ' . $post->ID .';' );
        }

        /**
         * Only run this if Polylang is activated
         */
        if( !function_exists( 'pll_get_post_language' ) ){
            return;
        }

        $all_languages              = pll_languages_list( [ 'hide_empty' => 0, 'fields' => array() ] );
        $languages_slug_and_names   = [];

        foreach( $all_languages as $language ){
            $languages_slug_and_names[] = [
                'slug' => $language->slug,
                'name' => $language->name,
            ];
        }

        $gt_post_info = [];
        if( $post ){
            $gt_post_info   = [
                'post_id'           => $post->ID,
                'post_type'         => $post->post_type,
                'post_lang'         => pll_get_post_language( $post->ID ),
                'nonce'             => wp_create_nonce( 'ps-gtapi' ),
                'languages'         => $languages_slug_and_names,
            ];
        }

        wp_add_inline_script( BaseController::$theme_prefix . '-scripts-admin', 'let ps_gtapi_post_info = ' . json_encode( $gt_post_info ) .';' );
    }

    public static function add_scripts() {
        add_action( 'admin_enqueue_scripts', [ self::class, 'enqueue_scripts' ], 1000000, 1  );
    }

    public static function add_styles() {
        add_action( 'admin_enqueue_scripts', [ self::class, 'enqueue_styles' ], 1000000, 1  );
    }

    static function remove_menu_pages() {
        add_action(
            'admin_menu',
            function () {
                remove_menu_page('edit.php?post_type=acf-field-group');
            },
            999
        );

    }

}
