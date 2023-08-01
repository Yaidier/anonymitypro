<?php

namespace SavvyTheme\Controllers;

/**
 * The Optimizations Controller Class
 *
 * @author Yaidier Perez
 * */

use SavvyTheme\Resources\Utilities;
use \Patchwork\JSqueeze;

class OptimizationsController extends BaseController {
    public const controller_name = 'optimizations';

    public static $is_lrc_scripts   = false;
    public static $lrc_resources    = [];
    public static $ldl_lrc_posts    = [];

	public static function init() {
        /**
         * check for cache options is mandatory before the 
         * controller active option.
         */
        self::check_for_cache_options(); 

        /**
         * If controller is deactivated, then return.
         */
        if( !BaseController::is_controller_active( self::controller_name ) ){
            return;
        }

        self::static_files_cache();
        
        self::preflight();
        self::dequeue_styles();
        self::disable_emojis();
        self::making_scripts_async();
        self::ldl_for_posts_content();
        self::later_resource_call();
        self::load_gtm_on_fui_event();
        self::minimal_google_analytics();
	}

    private static function insert_extra_content( $page_content ) {
        /**
         * Get current time
         */
        $current_date = current_datetime()->format('Y/m/d H:i:s');

        /**
         * Let js applications know that this is cached page.
         */
        $page_content = str_replace( '{{cachestatus}}', $current_date , $page_content );
        $page_content = '<!--Wn Cache Plugin (' . $current_date . ') -->' . $page_content;

        return $page_content;
    }

    public static function update_cache_for_save_post() {
        $post_ids = get_posts( [
            'post_type'         => ['pspt-vpn', 'pspt-antivirus', 'pspt-cloud', 'pspt-email', 'pspt-geoblocking', 'pspt-password', 'pspt-review', 'pspt-security'],
            'orderby'           => 'date',
            'post_status'       => 'publish',
            'order'             => 'DESC',
            'posts_per_page'    => -1,
            'fields'            => 'ids',
        ] );

        add_action( 'post_updated', function( $post_id ) use ( $post_ids ) {
            /**
             * If posts are not elegible for cache, then return.
             *
             */
            if( !in_array( $post_id, $post_ids ) ){
                return $post_id;
            }

            $post_url       = get_permalink( $post_id );
            $parsed_url     = parse_url( $post_url );
            $cache_url_path = $_SERVER['DOCUMENT_ROOT'] . '/app/cache/data' .  $parsed_url['path'] . 'index.html';

            if( file_exists( $cache_url_path ) ) {
                unlink( $cache_url_path );
            }
        });
    }

    public static function deactivate_cache() {
        $cache_rock_file = $_SERVER['DOCUMENT_ROOT'] . '/app/cache/rock.md';
        
        if( file_exists( $cache_rock_file ) ) {
            unlink( $cache_rock_file );
        }
    }
    public static function activate_cache() {
        $cache_rock_file = $_SERVER['DOCUMENT_ROOT'] . '/app/cache/rock.md';

        if( !file_exists( $cache_rock_file ) ) {
            fopen( $cache_rock_file, "w" );
        }
    }

    public static function check_for_cache_options(){
        add_action( 'update_option', function( $option, $old_value, $value ) {

            if( 'options_ps_theme_settings_performance_cache_active' == $option || 'options_savvy_controllers_optimizations' == $option ){
                if( $value ) {
                    self::activate_cache();
                }
                else {    
                    self::deactivate_cache();
                }
            }

            if( $option == 'options_ps_theme_settings_performance_cache_purge' && ( $value[0] ?? false ) == 'purge' ) {
                Utilities::flush_all_cache_files();
            }
        }, 10, 3 );

        /**
         * Set the Purge Cache checbox to false.
         */
        add_action('init', function() {
            update_option( 'options_ps_theme_settings_performance_cache_purge', false );
        });
    }

    public static function create_cache_for_visited_pages() {
        /**
         * If we are in wp admin, just return.
         */
        if( is_admin() ){
            return;
        }

        /*
        * If this is an autosave, our form has not been submitted,
        * so we don't want to do anything.
        */
        if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) || isset( $_REQUEST['bulk_edit'] ) ) {
            return;
        } 

        /**
         * If user is logged in, just return.
         */
        if( is_user_logged_in() ){
            return;
        }

        /**
         * If cache is deactiavted, then just return.
         * 
         * @see Wp Dashboard -> Theme Settings -> Performance Settings
         */
        if( !get_option( 'options_ps_theme_settings_performance_cache_active' ) ) {
            return;
        }

        /**
         * Elegible posts types for cache
         */
        $post_ids = get_posts( [
            'post_type'         => ['pspt-vpn', 'pspt-antivirus', 'pspt-cloud', 'pspt-email', 'pspt-geoblocking', 'pspt-password', 'pspt-review', 'pspt-security'],
            'orderby'           => 'date',
            'post_status'       => 'publish',
            'order'             => 'DESC',
            'posts_per_page'    => -1,
            'fields'            => 'ids',
        ] );

        /**
         * If there is a parameter in the url,
         * then do not create a file.
         */
        if ( strpos( $_SERVER['REQUEST_URI'], '?' ) !== false ) {
            return;
        }

        add_action( 'wp', function() use ( $post_ids ) {
            global $post;

            add_action( 'template_redirect', [ self::class, 'cache_buffer_start' ], 0 );
        } );
    }

    public static function cache_buffer_start() {
        add_action( 'shutdown', function() {
            ob_end_flush();
        }, PHP_INT_MAX );

        ob_start( [ self::class, 'create_cache_file' ] ); 
    }

    public static function static_files_cache() {
        self::set_noindex_for_old_cache_url_parementer();
        self::create_cache_for_visited_pages();
        self::update_cache_for_save_post();
    }

    public static function set_noindex_for_old_cache_url_parementer() {
        if ( strpos( $_SERVER['REQUEST_URI'], '?reversecache=getcontent' ) !== false ) {
            add_filter( 'wp_robots', function( $robots ){
                $robots['noindex']  = true;
                $robots['nofollow'] = true;
                
                return $robots;
            }, PHP_INT_MAX - 5 );

            add_filter( 'wpseo_robots', function( $robots_content ){
                $robots_content = str_replace( 'index, follow, ', '', $robots_content );             
                return $robots_content;
            }, PHP_INT_MAX - 5 );
        }
    }

    public static function create_cache_file( $page_content ) {

        /**
         * Get file path and post url.
         */
        $cache_url_path     = $_SERVER['DOCUMENT_ROOT'] . '/app/cache/data' .  $_SERVER['REQUEST_URI'];
        $cached_file_path   = $cache_url_path . 'index.html';

        if( !file_exists( $cached_file_path ) ){
            $dir_exists = true;
            
            if( !is_dir( $cache_url_path ) ){
                $dir_exists = wp_mkdir_p( $cache_url_path );
            }

            if( !$dir_exists ){
                return $page_content;
            }

            /**
             * Check if cache content closes with </html>
             */
            if ( strpos( $page_content, '</html>' ) === false ) {
                return $page_content;
            }
            
            /**
             * Check if cache content is the 404 template
             */
            if ( strpos( $page_content, 'id="ps-not_found_page"' ) !== false ) {
                return $page_content;
            }
            
            $page_content   = self::insert_extra_content( $page_content );
            $cached_file    = fopen( $cached_file_path, 'w' );
    
            fwrite( $cached_file, $page_content );
            fclose( $cached_file );
        }

        return $page_content;
    }

    private static function minimal_google_analytics() {
        add_action( 'wp_head', function() { 
            /**
             * Google Analytics Minmal
             * @see https://dariusz.wieckiewicz.org/en/minimal-google-analytics-4-snippet/
             */
            echo get_field( BaseController::$theme_prefix . '_controllers_optimizations_gtm_minimal', 'option' );
        }, 1 );
    }

    private static function load_gtm_on_fui_event() {
        /**
         * FUI stands for Firs User Interations...
         * Are events that on the ps-theme.js file
         * which get triggers as soon as the user, either 
         * scroll or move the mouse on the page.
         */
        if( !get_option( 'options_' . BaseController::$theme_prefix . '_controllers_optimizations_gtm' ) ){
            return;
        }
        
        /**
        * Loading the GTM script on a FUI event, means 
        * that the script don't run until the the page is
        * completely loaded and the user interacts with it.
        */
        add_action( 'wp_enqueue_scripts', function() {
            $lrc_gtm = get_field( BaseController::$theme_prefix . '_controllers_optimizations_gtm_lrc', 'option' );
            wp_add_inline_script( BaseController::$theme_prefix . '-scripts-all', 'let ps_load_gtm_on_fui = function() {'. $lrc_gtm .'};', 'before' );
        }, 10000, 1);
    }

    private static function later_resource_call() {
        /**
         * Do not apply Optimizations for the backend
         */
		if ( is_admin() ) {
            return;
		}

        self::get_posts_for_ldl_and_lrc();
        self::lrc_for_posts_last_sections();
        self::lrc_for_popups();

        add_action( 'wp_enqueue_scripts', function() {
            /**
             * We do not have popups in other than singles
             * 
             */
            if( !is_single() ){
                return;
            }

            $resources = self::get_lrc_resource();

            if( !$resources ){
                return;
            }

            wp_add_inline_script( BaseController::$theme_prefix . '-scripts-all', 'let ps_lrc_resources = ' . json_encode( $resources ) .';' );
        }, 10000, 1);
    }

    private static function lrc_for_popups(){
        add_action( 'wp', function() {
            /**
             * We do not have popups in other than singles
             * 
             */
            if( !is_single() ){
                return;
            }

            add_filter( 'timber/context', function( $context ) {
                $context['load_popup_from_lrc'] = true;

                return $context;
            } );

            add_action( 'timber_before_render', function( $context ) {
                $include_popup = $context['include_popup'] ?? false;

                if( !$include_popup ){
                    return;
                }

                $args = [
                    'include_popup' => $include_popup,
                ];

                self::load_scripts_on_lrc();
                self::add_lrc_resource( 'lrc_popups', $args );
            } );
        });
    }

    private static function preflight() {
        /**
         * Do not apply Optimizations for the backend
         */
		if ( is_admin() ) {
            return;
		}

        /**
         * Do not show wp favicon
         */
        add_filter( 'get_site_icon_url', function( $url ){
            return get_stylesheet_directory_uri() . '/assets/favicons/favicon.ico';
        } );
    }

    public static function add_lrc_resource( $resource, $args = [] ){
        $args['resource_name']  = $resource;
        $args['current_lang']   = Utilities::get_current_language() ;

        self::$lrc_resources[] = $args;
    }

    public static function get_lrc_resource(){
        return self::$lrc_resources;
    }

    /**
     * Later Resource Load only 
     * for the "Share this Article", "Realted Readings", 
     * "About the Author" and "Comments" sections.
     * 
     */
    public static function lrc_for_posts_last_sections() {
        if( is_admin() ){
            return;
        }

        $posts_ids = self::$ldl_lrc_posts;

        add_action( 'wp', function() use ( $posts_ids ) {
            if( !is_single() ){
                return;
            }

            global $post;
            $post_id = $post->ID;

            if( !in_array( $post_id, $posts_ids ) ){
                return;
            }

            self::load_scripts_on_lrc();
            self::add_lrc_resource( 'lrc_last_sections' );
            
            add_filter( 'timber/context', function( $context ) {
                $context['lrc_last_sections_start'] = '<!--{{ldl_last_sections}}';
                $context['lrc_last_sections_end']   = '{{ldl_last_sections}}-->';
    
                return $context;
            } );

            add_filter( 'timber_compile_result', function( $output ) use ( $post_id ) {
                if ( strpos( $output, '<!doctype html>' ) === false ) {
                    return $output;
                }

                $dom = new \DomDocument; 

                /**
                 * HTML5 entities (<figure> and <figcaption>) aren't 
                 * recognized by the old DOMDocument parser of PHP.
                 * So we need to silence the Warnings while using PHP7
                 */
                libxml_use_internal_errors(true);
                $dom->loadHTML( $output ); 
                libxml_clear_errors();

                $dom->preserveWhiteSpace = false; 
                $dom->formatOutput = true; 

                $wrapper = $dom->getElementById('ps-lrc_last_sections'); 

                if( !$wrapper ){
                    return $output;
                }

                $children = $wrapper->childNodes;
                $iterator = 0;
                $lrc_last_sections = '';
                foreach( $children as $child ){
                    $lrc_last_sections .= $wrapper->ownerDocument->saveHTML( $child );

                    $iterator++;
                }

                $start_pos  = strpos( $output, '<!--{{ldl_last_sections}}' );
                $end_pos    = strpos( $output, '{{ldl_last_sections}}-->' );
                $length     = $end_pos - $start_pos + 24;

                $output_clean = substr_replace( $output, '', $start_pos, $length );

                update_post_meta( $post_id, 'lrc_last_sections', $lrc_last_sections );

                return $output_clean;
            } );

        } );
    }

    public static function load_scripts_on_lrc() {
        if( self::$is_lrc_scripts ){
            return;
        }

        add_action( 'wp_enqueue_scripts', function() {
            wp_add_inline_script( BaseController::$theme_prefix . '-scripts-all', 'const ps_load_scrips_on_lrc = true;' );
        }, 100, 1);

        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if( $handle == BaseController::$theme_prefix . '-scripts-all' ){
                return $tag;
            }

            /**
             * Removing Async if is set
             */
            $tag = str_replace( 'async', '', $tag );
            $tag = str_replace( 'src=', 'class=\'ps-lrc_scripts\' data-src=', $tag );

            return $tag;
        }, 1000, 3 );

        self::$is_lrc_scripts = true;
    }

    private static function get_posts_for_ldl_and_lrc(){
        if( !empty( self::$ldl_lrc_posts ) ){
            return self::$ldl_lrc_posts;
        }

        self::$ldl_lrc_posts = get_posts( [
            'post_type'         => ['pspt-vpn', 'pspt-antivirus', 'pspt-cloud', 'pspt-email', 'pspt-geoblocking', 'pspt-password', 'pspt-review', 'pspt-security'],
            'orderby'           => 'date',
            'post_status'       => 'publish',
            'order'             => 'DESC',
            'posts_per_page'    => -1,
            'fields'            => 'ids',
        ] );

        return self::$ldl_lrc_posts;
    }

    /**
     * LDL stands for Later DOM Load, the intention 
     * with this function is to insert the major part of 
     * the post content commented into the document, 
     * on that way the browser do not parse it. Then 
     * on a FUI( First User Interaction ) event, we uncomment
     * the content and the user can interact with it.
     * 
     * @see /src/js/savvy-theme.js SavvyTheme.display_the_ldl_content()
     * 
     */
    public static function ldl_for_posts_content() {
        /**
         * Define which posts are eleigble for 
         * LDL and for LRC.
         */
        $posts_ids = self::get_posts_for_ldl_and_lrc();
  
        /**
         * Update the LDL content once the posts gets updated.
         */
        add_action( 'save_post', function( $post_id ) use ( $posts_ids ) {
            /**
             * If post isn't elegible for LDL then return.
             */
            if( !in_array( $post_id, $posts_ids ) ){
                return;
            }

            /*
            * If this is an autosave, our form has not been submitted,
            * so we don't want to do anything.
            */
            if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
                return $post_id;
            }

            /**
             * Just ensure user can edit posts.
             */
            if ( !current_user_can( 'edit_posts', $post_id ) ) {
                return $post_id;
            }

            /**
             * Get post content.
             */
            $content = apply_filters( 'the_content', get_the_content( null, false, $post_id ) );

            /**
             * If got LDL successfully, then update it on the post meta
             * for later usage.
             * 
             */
            if( $ldl_content = Utilities::instance()->prepare_content_for_ldl( $content ) ){
                update_post_meta( $post_id, 'ldl_content', $ldl_content );
            }

            return $post_id;
        } );

        add_action( 'wp', function() use ( $posts_ids ) {
            global $post;

            /**
             * We do not have LDL contennt
             * in other than singles
             */
            if( !is_single() ){
                return;
            }

            /**
             * If post isn't defined, then return.
             */
            if( !$post ){
                return;
            }

            /**
             * If post isn't elegible for LDL then return.
             */
            if( !in_array( $post->ID, $posts_ids ) ){
                return;
            }

            /**
             * Load the scripts on LRC(Later Resource Call).
             */
            self::load_scripts_on_lrc();

            /**
             * Let our JS app know, that we are sending a post with LDL.
             */
            add_action( 'wp_enqueue_scripts', function() use ( $post ) {
                wp_add_inline_script( BaseController::$theme_prefix . '-scripts-all', 'const ps_ldl = ' . $post->ID .';' );
            }, 100, 1);

            /**
             * Prepare $args variable to use in the filter.
            */
            $args = [ 
                'post_id'       => $post->ID,
                'ldl_content'   => get_post_meta( $post->ID, 'ldl_content', true ),
            ];

            /**
             * Custom filter applied before sending the post content 
             * to the templates.
             * 
             * @see /app/Resources/Utilities.php Utilities::prepare_single_post_type()
             */
            add_filter( 'ldl_content', function( $content ) use ( $args ) {
                /**
                 * Extract variables $post_id and $ldl_content 
                 * from $args.
                 * 
                 * @var $post_id, $ldl_content.
                 * 
                 */
                extract( $args );

                /**
                 * If $ldl_content exists, just return it.
                 * 
                 * Otherwise we will continue and update the post meta
                 * with the the LDL content. 
                 */
                if( $ldl_content ){
                    return $ldl_content;
                }
                
                /**
                 * Convert post raw content (wp blocks) into html content.
                 */
                $content = apply_filters( 'the_content', $content );

                /**
                 * If we get LDL content, then update the post meta, 
                 * so we don't need to get it again as the prepare_content_for_ldl()
                 * function is expensive.
                 */
                if( $ldl_content = Utilities::instance()->prepare_content_for_ldl( $content ) ) {
                    update_post_meta( $post_id, 'ldl_content', $ldl_content );
                    return $ldl_content;
                }

                return $content;
            }, 1000, 1 );

        } );
    }

    public static function set_script_async( $target_handle ) {
        /**
         * We do not need async scripts on the backend... so far.
         */
        if( is_admin() ){
            return;
        }

        self::wait_for_async_jquery( $target_handle );

        add_filter( 'script_loader_tag', function( $tag, $handle ) use ( $target_handle ) {
            if( $target_handle != $handle ){
                return $tag;
            }

            /**
             * Making the script async
             */
            $tag = str_replace( ' src=', ' async src=', $tag );

            return $tag;
        }, 10, 3 );
    }

    public static function set_style_async( $target_handle ) {
         /**
         * We do not need async styles on the backend... so far.
         */
        if( is_admin() ){
            return;
        }

        add_filter( 'style_loader_tag', function( $tag, $handle, $href ) use ( $target_handle ) {
            if( $target_handle != $handle ){
                return $tag;
            }

            /**
             * Making the style async
             */
            $tag = str_replace( "rel='stylesheet'", "rel='preload' as='style' onload='this.onload=null;this.rel=\"stylesheet\"' ", $tag );
            $tag = $tag . "<noscript><link rel='stylesheet' href='" . $href . "'></noscript>";

            return $tag;
        }, 10, 3 );
    }

    private static function wait_for_async_jquery( $target_handle ) {
        /**
         * We do not need to wait for 
         * async jquery on the backend... so far.
         */
        if( is_admin() ){
            return;
        }

        add_filter( 'script_loader_src', function( $src, $handle ) use ( $target_handle ) {

            if ( $handle != $target_handle ) {
                return $src;
            }

            /**
             * Check if script has jQuery dependency
             */
            global $wp_scripts;
            
            $registered_script  = $wp_scripts->registered[$target_handle];
            $dependencies       = $registered_script->deps;

            /**
             * Lowercase Dependencies
             */
            foreach( $dependencies as &$dependency ) {
                strtolower( $dependency );
            }

            if( !in_array( 'jquery', $dependencies ) && ( $target_handle != 'jquery-migrate' ) ){
                return $src;
            }

            $prev_last_mod  = (int) get_option( $target_handle . '_last_mod_date' );
            $file_uri       = SAVVY_THEME_DIR_URI . '/performance/wfajq/' . $target_handle . '-wait_for_aync_jquery.js';
            $version        = $prev_last_mod ? '?ver="' . $prev_last_mod . '"' : '';
                        

            $parsed_src         = parse_url( $src );
            $path               = $parsed_src['path'];
            $absolute_path      = $_SERVER['DOCUMENT_ROOT'] . $path;
            $last_mod           = filemtime( $absolute_path );
            $directory_path     = SAVVY_THEME_DIR . '/performance/wfajq/';
            $directory_exist    = file_exists( $directory_path );
            $file_path          = $directory_path . $target_handle . '-wait_for_aync_jquery.js';
            $file_exist         = file_exists( $file_path );

            if( $last_mod != $prev_last_mod || !$directory_exist || !$file_exist ) {
                if( !$directory_exist) {
                    $response = mkdir( $directory_path );
                }

                $file_contents  = file_get_contents( $absolute_path );
                $prefix         = str_replace( '-', '_', $target_handle );

                $output   = 'let ' . $prefix . '_wfjq_con = 0;
                function ' . $prefix . '_ps_wfjq() {
                    ' . $prefix . '_wfjq_con++;
                    if (window.jQuery) {
                        console.log("'. $prefix .' script loaded successfully.");
                        ' . $file_contents . '
                    } else {
                        setTimeout(function() { 
                            if( ' . $prefix . '_wfjq_con < 20 ){
                                ' . $prefix . '_ps_wfjq();
                            }
                            else {
                                console.log("Heads Up!!! JQuery is not loading for this page");
                            }
                        }, 300);
                    }
                }
                if (document.readyState != "loading") {
                    ' . $prefix . '_ps_wfjq();
                }
                else {
                    document.addEventListener("DOMContentLoaded", () => {
                        ' . $prefix . '_ps_wfjq();
                    });
                }';
     
                /**
                 * Create the minifier
                 */
                $minifier = new JSqueeze();
                $output = $minifier->squeeze(
                    $output,
                    true,   // $singleLine
                    false,  // $keepImportantComments
                    false   // $specialVarRx
                );
                
                $response = file_put_contents( $file_path, $output );  

                if( $response != false ){
                    update_option( $target_handle . '_last_mod_date', $last_mod );
                    $version = '?ver=' . $last_mod;
                }
            }

            return $file_uri . $version .'"';
        }, 1000, 3 );
    }

    private static function making_scripts_async() {
        $go = apply_filters( 'savvy_optimization_make_scripts_async', true ) ?? true;

        if( !$go ){
            return;
        }

        /**
         * Do not apply Optimizations for the backend
         */
		if ( is_admin() ) {
            return;
		}

        if( $GLOBALS['pagenow'] == 'ps-access.php' ){
            return;
        }

        self::set_script_async('jquery-core');
        self::set_script_async('jquery-migrate');
        self::set_script_async('ta_main_js');
        self::set_script_async('tap-gct');
    }

    private static function disable_emojis() {
        /**
         * Do not apply Optimizations for the backend
         */
		if ( is_admin() ) {
            return;
		}
        
        /**
         * Disable the emoji's
         */
        add_action( 'init', function(){
            remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
            remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
            remove_action( 'wp_print_styles', 'print_emoji_styles' );
            remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
            remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
            remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
            remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

            /**
            * Filter function used to remove the tinymce emoji plugin.
            */
            add_filter( 'tiny_mce_plugins', function( $plugins ) {
                if ( is_array( $plugins ) ) {
                    return array_diff( $plugins, array( 'wpemoji' ) );
                    } else {
                    return array();
                    }
            } );

            /**
            * Remove emoji CDN hostname from DNS prefetching hints.
            */
            add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
                if ( 'dns-prefetch' == $relation_type ) {
                    /** This filter is documented in wp-includes/formatting.php */
                    $emoji_svg_url  = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
                    $urls           = array_diff( $urls, array( $emoji_svg_url ) );
                }
                   
                return $urls;
            }, 10, 2 );
        } );
    }

    private static function dequeue_styles() {
        /**
         * Do not apply Optimizations for the backend
         */
		if ( is_admin() ) {
            return;
		}

        add_action( 'wp_enqueue_scripts', function () {
            global $post;

            if( !$post ){
                return;
            }

            /**
             * Remove Gutenberg Block Library CSS from loading on the frontend
             */
            wp_dequeue_style( 'wp-block-library' );
            wp_dequeue_style( 'wp-block-library-theme' );
            wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS

            /**
             * Removing the vscf style from all pages except from Contact Page
             */
            if( $post->ID !== 638 ) {
                wp_dequeue_style( 'vscf_style' ); 
            }

        }, 10000 );
    }
}