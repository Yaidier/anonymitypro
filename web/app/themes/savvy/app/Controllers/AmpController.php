<?php

namespace SavvyTheme\Controllers;

/**
 * The AMP Controller Class
 *
 * @author Yaidier Perez
 * */

class AmpController extends BaseController {

    public static function init() {
        self::add_custom_css();
        self::add_cpt_support();
    }

    public  static function add_custom_css() {
        add_action( 'wp_enqueue_scripts', array( self::class, 'register_css_stylesheet' ) );
        add_action( 'amp_post_template_css', array( self::class, 'print_custom_css' ) );
    }

    public static function register_css_stylesheet() {
        if( !file_exists( get_stylesheet_directory() . '/assets/css/amp.css' ) ){
            return;
        }

        wp_register_style( 
            'savvy-styles-amp',
            get_stylesheet_directory_uri() . '/assets/css/amp.css',
            array(),
            filemtime( get_stylesheet_directory() . '/assets/css/amp.css' )
        );
    }

    public static function print_custom_css() {
        wp_print_styles( 'savvy-styles-amp' );
    }

    /**
     * Maybe improve this function?
     */
    public static function add_cpt_support() {
        add_filter('amp_post_template_data', function ($data) {
            $data['font_urls']['FontAwesome']               =  SAVVY_THEME_DIR_URI . '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';
            $data['amp_component_scripts']['amp-sidebar']   = 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js';
            $data['amp_component_scripts']['amp-accordion'] = 'https://cdn.ampproject.org/v0/amp-accordion-0.1.js';

            return $data;
        });
    }
}
