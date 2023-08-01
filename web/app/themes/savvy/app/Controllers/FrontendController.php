<?php

namespace SavvyTheme\Controllers;

/**
 * The Front-End Controller Class
 *
 * @author Yaidier Perez
 * */

use SavvyTheme\Controllers\OptimizationsController;

class FrontendController extends BaseController {

    static private $scripts;
    static private $manifest;

	public static function init() {
		if ( !is_admin() ) {
            add_action( 'wp', function() {
                self::add_styles();
                self::add_scripts();
                self::enqueue_assets();
                self::localize_scripts();
                self::manage_breadcumbs();
                self::inline_custom_scripts();
            } );
		}
	}

    private static function add_styles() {
        /**
         * Load all across the site
         */
        self::add_style( '/assets/css/all.css', [], true );
	}

    private static function add_scripts() {
        self::add_script( '/assets/js/all.js', [], true, true );
	}

    private static function localize_scripts() {
        add_action( 'wp_enqueue_scripts', function() {
            wp_localize_script( BaseController::$theme_prefix . '-scripts-all', 'ajax_var', 
                [
                    'url'                   => admin_url( 'admin-ajax.php' ),
                    'cache_status'          => '{{cachestatus}}',
                ]
            );
        } );

        /**
         * Sending the current post_id for single pages
         */
        add_action( 'wp_enqueue_scripts', function() {
            global $post;

            if( !$post ){
                return;
            }

            wp_add_inline_script( BaseController::$theme_prefix . '-scripts-all', 'const ps_single_post_id = ' . $post->ID .';' );
        }, 100, 1);
    }

    private static function add_style( $script_path, array $depend = [], $is_async = false ) {
        self::add_asset( 'styles', $script_path, $depend, false, $is_async );
    }

    private static function add_script( $script_path, array $depend = [], bool $load_in_footer = false, bool $is_async = false ) {
        self::add_asset( 'scripts', $script_path, $depend, $load_in_footer, $is_async );
    }

    private static function add_asset( string $type, $path, $depend, $load_in_footer = false, $is_async = false ) {
        if( empty( self::$scripts ) ) {
            self::init_scripts_var();
        }

        $path_parts = pathinfo( $path );
        $filename   = $path_parts['filename'];
        $handle     = self::get_handler( $type, $filename );
        $uri        = self::get_uri( $path );
        $full_path  = self::get_full_path( $path );
        $version    = self::get_version( $path, $full_path );

        array_push(  self::$scripts[$type], [
            'handle'    => $handle,
            'uri'       => $uri,
            'depend'    => $depend,
            'version'   => $version,
            'footer'    => $load_in_footer,
        ] );

        if( !$is_async ){
            return;
        }

        /**
         * Regiser the filter to make it async
         */
        switch ( $type ) {
            case 'scripts':
                OptimizationsController::set_script_async( $handle );
                break;
            case 'styles':
                OptimizationsController::set_style_async( $handle );
                break;
            default:
                break;
        }
    }

    private static function get_handler( string $type, string $filename ){
        return BaseController::$theme_prefix . '-' . $type . '-' . $filename;
    }

    private static function enqueue_assets() {
        $scripts = self::$scripts;

        add_action( 'wp_enqueue_scripts', function () use ( $scripts ) {
            foreach( $scripts as $script_type => $scripts ) {
                foreach( $scripts as $script ) {
                    $hanlde         = $script['handle'];
                    $uri            = $script['uri'];
                    $depend         = $script['depend'];
                    $version        = $script['version'];
                    $load_in_footer = $script['footer'];

                    if( 'styles' === $script_type ) {
                        wp_enqueue_style( 
                            $hanlde, 
                            $uri, 
                            $depend, 
                            $version,
                        );
                    }
                    else if( 'scripts' === $script_type ) {
                        wp_enqueue_script( 
                            $hanlde, 
                            $uri, 
                            $depend, 
                            $version,
                            $load_in_footer,
                        );
                    }
                }
            }
		} );
    }

    private static function init_scripts_var() {
        self::$scripts = [
            'styles'    => [],
            'scripts'   => [],
        ];

        self::$manifest = self::get_manifest();
    }

    private static function get_uri( string $path ) {
        return get_stylesheet_directory_uri() . $path;
    }

    private static function get_full_path( string $path ) {
        return get_stylesheet_directory() . $path;
    }

    private static function get_version( $path, $full_path ) {
        /**
         * If manifest version isn't set, 
         * then get the file last modification date.
         */
        if( 
            ( empty( self::$manifest[$path] ) ) || 
            ( !$version_pos = strrpos( self::$manifest[$path], '?id=' ) ) 
            ) {
            
            return self::get_version_based_on_file_modification( $full_path );
        }

        return substr( self::$manifest[$path], $version_pos + 4 );
    }

    private static function get_version_based_on_file_modification( $path ) {
        return filemtime( $path );
    }

	protected static function get_manifest() {
		$path     = SAVVY_THEME_DIR . '/mix-manifest.json';
		$manifest = file_get_contents( $path );

		return json_decode( $manifest, true );
	}

    /**
     * Maybe improve this function
     */
    private static function manage_breadcumbs() {
        add_filter( 'wpseo_breadcrumb_links', function ( $crumbs ) {
            global $post;

            if( !$post ){
                return $crumbs;
            }
            
            $post_type              = get_post_type( $post->ID );
            $post_type_archive_link = get_post_type_archive_link( $post_type );
        
            $crumbs[1] = [
                'text'  => 'News',
                'url'   => $post_type_archive_link,
            ];

          return $crumbs;
        } );
    }

    private static function inline_custom_scripts() {

        add_action( 'wp_head', function() {     
            /**
             * Do not load the Tracking Codes as we are 
             * loading them in the Optimizations Controller.
             */
            if( get_field( BaseController::$theme_prefix . '_controllers_optimizations_gtm', 'option' ) ) {
                return;
            }

            /**
             * Get Tracking Codes
             */
            echo get_field( BaseController::$theme_prefix . '_settings_gtm_head', 'option' );
        } );

        /**
         * Get Non Script Tracking Codes
         */
        add_action( 'wp_body_open', function() {
            /**
             * Always load the body non-script trackin code, either 
             * if we are optimizing the gtm or not.
             */
            echo get_field( BaseController::$theme_prefix . '_settings_gtm_body', 'option' );
        }, 1 );
    }
}