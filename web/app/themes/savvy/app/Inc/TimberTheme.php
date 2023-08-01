<?php

namespace SavvyTheme\inc;

// use SavvyTheme\Resources\OperatingSystems;
use SavvyTheme\Resources\Utils;

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class TimberTheme extends \Timber\Site {

    /** Add timber support. */
    public function __construct() {
        add_action( 'after_setup_theme',    array( $this, 'after_setup_theme' ) );
        add_filter( 'timber/context',       array( $this, 'add_to_context' ) );
        add_filter( 'timber/twig',          array( $this, 'add_to_twig' ) );
        add_filter( 'amp_get_permalink',    array( $this, 'configure_amp_permalinks' ) );

        /**
         * Disable plugin and theme auto update
         */
        add_filter( 'auto_update_plugin',   '__return_false' );
        add_filter( 'auto_update_theme',    '__return_false' );

        parent::__construct();
    }

    public function after_setup_theme() {
        self::theme_supports();
        self::add_image_sizes();
        self::register_menues();
    }

    public static function theme_supports() {
        add_theme_support('widgets');
        add_theme_support('disable-custom-colors');

        /**
         * Empty array has to be passed 
         * as argument in order to avoid a wp warning bug.
         * 
         * See: https://github.com/WordPress/gutenberg/issues/38768
         */
        add_theme_support('editor-font-sizes', array());

        add_theme_support(
            'editor-color-palette',
            [
                [
                    'name' => 'White',
                    'slug' => 'white',
                    'color' => '#fff',
                ],
                [
                    'name' => 'Light Grey',
                    'slug' => 'grey-100',
                    'color' => '#fafbfe',
                ],
                [
                    'name' => 'Dark Grey',
                    'slug' => 'grey-900',
                    'color' => '#232323',
                ],
            ]
        );

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
        add_theme_support('title-tag');

        /*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
        add_theme_support('post-thumbnails');

        /*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'search-form',
                'script',
                'style',
            )
        );

        add_theme_support('menus');
    }

    public static function add_image_sizes() {
        add_image_size('ps-testimonial', 50, 50);
        add_image_size('ps-review-logo-sm', 100, 100);
        add_image_size('ps-post-main', 820, 460);
        add_image_size('ps-post-featured', 610, 342);
        add_image_size('ps-post-featured-md', 410, 230);
        add_image_size('ps-post-featured-sm', 300, 168);
    }

    public static function register_menues() {
        register_nav_menus(
            [
                'header_menu'       => 'Header Menu',
                'footer_menu_1'     => 'Footer Menu 1',
                'footer_menu_2'     => 'Footer Menu 2',
                'footer_menu_3'     => 'Footer Menu 3',
                'footer_menu_4'     => 'Footer Menu 4',
                'footer_menu_legal' => 'Footer Menu Legal',
            ]
        );
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context( $context ) {
        $context['logo']        = get_field( 'savvay_settings_identity_logo', 'option' );
        $context['logo_dark']   = get_field( 'savvay_settings_identity_logo_dark', 'option' );
        $context['logo_alt']    = get_field( 'savvay_settings_identity_logo_alt', 'option' );
        $context['logo_svg']    = get_field( 'savvay_settings_identity_logo_svg', 'option' );
        $context['site']        = $this;

        return $context;
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig( $twig ) {
        $twig = (object) $twig;
        
        $twig->addExtension(new \Twig\Extension\StringLoaderExtension());
        // $twig->addExtension(new \buzzingpixel\twigswitch\SwitchTwigExtension());
    
        return $twig;
    }

    public function configure_amp_permalinks( $amp_url ) {
        return str_replace( '/amp/', '/?amp', $amp_url );
    }

}
