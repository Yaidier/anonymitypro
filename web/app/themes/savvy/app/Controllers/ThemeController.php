<?php

namespace SavvyTheme\Controllers;

use Timber\Timber;
use SavvyTheme\Inc\TimberTheme;
use SavvyTheme\Resources\Utilities;

/**
 * The Theme Controller Class
 *
 * @author Yaidier Perez
 * */

class ThemeController extends BaseController {

	public static function init() {
        self::init_timber();
        self::set_theme_options();
        self::filter_some_warnings();
	}

    public static function filter_some_warnings() {
        add_filter( 'site_status_tests', function ( array $test_type ) {
            /**
             * Remove 'Automatic Updates Disabled' warning from
             * wp -> tools -> Site Health
             */
            unset($test_type['async']['background_updates']);

            return $test_type;
        }, 10, 1);
    }

    public static function set_theme_options() {
        add_action( 'acf/init', [ self::class, 'register' ] );
        add_action( 'acf/init', [ self::class, 'register_fields' ] );
        add_action( 'acf/init', [ self::class, 'register_paid_ads_page_fields' ] );
    }

    public static function register() {
        $parent_slug    = 'ps-theme-general-settings';
        $options_pages  = [
            [
                'page_title'    => 'General Settings',
                'menu_title'    => 'Theme Settings',
                'menu_slug'     => 'ps-theme-general-settings',
                'capability'    => 'manage_options',
                'redirect'      => false,
                'autoload'      => true,
            ],
            [
                'page_title'    => 'Controllers',
                'menu_title'    => 'Controllers',
                'menu_slug'     => BaseController::$theme_prefix . '_controllers',
                'parent_slug'   => $parent_slug,
                'autoload'      => true,
            ],
            [
                'page_title'    => 'Footer Settings',
                'menu_title'    => 'Footer Settings',
                'menu_slug'     => 'ps-theme-footer-settings',
                'parent_slug'   => $parent_slug,
                'autoload'      => true,
            ],
            [
                'page_title'    => 'General Settings',
                'menu_title'    => 'General Settings',
                'menu_slug'     => BaseController::$theme_prefix . '_settings',
                'parent_slug'   => $parent_slug,
                'autoload'      => true,
            ],
        ];

        foreach( $options_pages as $option_page ){
            acf_add_options_page( $option_page );
        }
    }

    public static function register_fields() {
        /** 
         * General Settings
         */
        acf_add_local_field_group( [
            'key'       => BaseController::$theme_prefix . '_settings_group',
            'title'     => 'General Settings',
            'fields'    => [
                [
                    'key'   => BaseController::$theme_prefix . '_settings_gtm_tab',
                    'name'  => BaseController::$theme_prefix . '_settings_gtm_tab',
                    'label' => 'Google Tag Manager',
                    'type'  => 'tab',
                ],
                [
                    'key'   => BaseController::$theme_prefix . '_settings_gtm_head',
                    'name'  => BaseController::$theme_prefix . '_settings_gtm_head',
                    'label' => 'Script in Head',
                    'type'  => 'textarea',
                    'default_value' => '',
                ],
                [
                    'key'   => BaseController::$theme_prefix . '_settings_gtm_body',
                    'name'  => BaseController::$theme_prefix . '_settings_gtm_body',
                    'label' => 'Script in Body',
                    'type'  => 'textarea',
                    'default_value' => '',
                ],
                [
                    'key'   => 'savvay_settings_identity_tab',
                    'name'  => 'savvay_settings_identity_tab',
                    'label' => 'Site Identity',
                    'type'  => 'tab',
                ],
                [
                    'key'           => 'savvay_settings_identity_logo',
                    'name'          => 'savvay_settings_identity_logo',
                    'label'         => 'Logo',
                    'type'          => 'image',
                    'return_format' => 'array',
                    'preview_size'  => 'thumbnail',
                ],
                [
                    'key'           => 'savvay_settings_identity_logo_dark',
                    'name'          => 'savvay_settings_identity_logo_dark',
                    'label'         => 'Logo Dark',
                    'type'          => 'image',
                    'return_format' => 'array',
                    'preview_size'  => 'thumbnail',
                ],
                [
                    'key'           => 'savvay_settings_identity_logo_alt',
                    'name'          => 'savvay_settings_identity_logo_alt',
                    'label'         => 'Logo Alt',
                    'type'          => 'image',
                    'return_format' => 'array',
                    'preview_size'  => 'thumbnail',
                ],
                [
                    'key'           => 'savvay_settings_identity_logo_svg',
                    'name'          => 'savvay_settings_identity_logo_svg',
                    'label'         => 'Logo Svg',
                    'type'          => 'textarea',
                ],
                [
                    'key'           => 'savvay_settings_identity_logo_icon',
                    'name'          => 'savvay_settings_identity_logo_icon',
                    'label'         => 'Logo Svg',
                    'type'          => 'textarea',
                ],
            ],
            'location' => [
                [
                    [
                        'param'     => 'options_page',
                        'operator'  => '==',
                        'value'     => BaseController::$theme_prefix . '_settings',
                    ],
                ],
            ],
        ] );

        /** 
         * Controllers Fields
         */
        acf_add_local_field_group( [
            'key'       => BaseController::$theme_prefix . '_controllers_group',
            'title'     => 'Controllers Settings',
            'fields'    => [
                [
                    'key'   => BaseController::$theme_prefix . '_controllers_optimizations',
                    'name'  => BaseController::$theme_prefix . '_controllers_optimizations',
                    'label' => 'Active Optimizations',
                    'type'  => 'true_false',
                    'ui'    => 1,
                    'default_value' => 0,
                ],
                [
                    'key'   => BaseController::$theme_prefix . '_controllers_optimizations_gtm_tab',
                    'name'  => BaseController::$theme_prefix . '_controllers_optimizations_gtm_tab',
                    'label' => 'Google Tag Manager',
                    'type'  => 'tab',
                    'conditional_logic' => [
                        [
                            [
                                'field'     =>  BaseController::$theme_prefix . '_controllers_optimizations',
                                'operator'  => '==',
                                'value'     => 1,
                            ],
                        ],
                    ],
                ],
                [
                    'key'   => BaseController::$theme_prefix . '_controllers_optimizations_gtm',
                    'name'  => BaseController::$theme_prefix . '_controllers_optimizations_gtm',
                    'label' => 'Optimize GTM',
                    'type'  => 'true_false',
                    'ui'    => 1,
                    'default_value' => 0,
                ],
                [
                    'key'   => BaseController::$theme_prefix . '_controllers_optimizations_gtm_minimal',
                    'name'  => BaseController::$theme_prefix . '_controllers_optimizations_gtm_minimal',
                    'label' => 'Minimal Analytics Tracking Code',
                    'type'  => 'textarea',
                    'default_value' => '',
                    'conditional_logic' => [
                        [
                            [
                                'field'     =>  BaseController::$theme_prefix . '_controllers_optimizations_gtm',
                                'operator'  => '==',
                                'value'     => 1,
                            ],
                        ],
                    ],
                ],
                [
                    'key'       => BaseController::$theme_prefix . '_controllers_optimizations_gtm_lrc',
                    'name'      => BaseController::$theme_prefix . '_controllers_optimizations_gtm_lrc',
                    'label'     => 'Load Analytics on LRC',
                    'instructions' => 'Important: Remove the "scripts" tags from the code',
                    'type'      => 'textarea',
                    'default_value' => '',
                    'conditional_logic' => [
                        [
                            [
                                'field'     =>  BaseController::$theme_prefix . '_controllers_optimizations_gtm',
                                'operator'  => '==',
                                'value'     => 1,
                            ],
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param'     => 'options_page',
                        'operator'  => '==',
                        'value'     => BaseController::$theme_prefix . '_controllers',
                    ],
                ],
            ],
        ] );

        /** 
         * Security Fields
         */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_security_field_group',
            'title' => 'Security Settings',
            'fields' => [
                [
                    'key' => 'ps_theme_settings_security_recpatcha_tab',
                    'name' => 'ps_theme_settings_security_recpatcha_tab',
                    'label' => 'Login Captcha',
                    'type' => 'tab',
                ],
                [
                    'key' => 'ps_theme_settings_security_recpatcha_active',
                    'name' => 'ps_theme_settings_security_recpatcha_active',
                    'label' => 'Active',
                    'type' => 'true_false',
                    'ui' => 1,
                    'default_value' => 0,
                ],
                [
                    'key' => 'ps_theme_settings_security_recpatcha_site_key',
                    'name' => 'ps_theme_settings_security_recpatcha_site_key',
                    'label' => 'Site Key',
                    'type' => 'text',
                ],
                [
                    'key' => 'ps_theme_settings_security_recpatcha_secret_key',
                    'name' => 'ps_theme_settings_security_recpatcha_secret_key',
                    'label' => 'Secret Key',
                    'type' => 'text',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-general-settings',
                    ],
                ],
            ],
        ] );

        /** 
         * Performance Fields
         */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_performance_field_group',
            'title' => 'Performance Settings',
            'fields' => [
                [
                    'key' => 'ps_theme_settings_performance_cache_tab',
                    'name' => 'ps_theme_settings_performance_cache_tab',
                    'label' => 'Cache',
                    'type' => 'tab',
                ],
                [
                    'key' => 'ps_theme_settings_performance_cache_active',
                    'name' => 'ps_theme_settings_performance_cache_active',
                    'label' => 'Active',
                    'type' => 'true_false',
                    'ui' => 1,
                    'default_value' => 0,
                ],
                [
                    'key'   => 'ps_theme_settings_performance_cache_purge',
                    'name'  => 'ps_theme_settings_performance_cache_purge',
                    'label' => 'Purge Cache Now',
                    'type'  => 'checkbox',
                    'choices' => [
                        'purge' => 'Purge'
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-general-settings',
                    ],
                ],
            ],
        ] );

        /** 
         * Newsletter fields [footer] 
         */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_footer_newsletter_field_group',
            'title' => 'Footer Newsletter Settings',
            'fields' => [
                [
                    'key' => 'ps_theme_settings_footer_newsletter_email_optin_mc4wp_sc',
                    'name' => 'footer_newsletter_email_optin_mc4wp_sc',
                    'label' => 'MC4WP Shortcode ( i.e. [mc4wp_form id="3094"] )',
                    'type' => 'text',
                ],
                [
                    'key' => 'ps_theme_settings_footer_newsletter_email_optin_tip',
                    'name' => 'footer_newsletter_email_optin_tip',
                    'label' => 'Email Optin Tip',
                    'type' => 'text',
                    'default_value' => 'Only the best curated news.',
                ],
                [
                    'key' => 'ps_theme_settings_footer_ft_image_',
                    'name' => 'footer_ft_image_',
                    'label' => 'Leave blank if you want to hide all featured image',
                    'type' => 'text',
                    'default_value' => 'yes',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-footer-settings',
                    ],
                ],
            ],
        ] );

        /** 
         * social fields [general]
         *  */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_general_social_field_group',
            'title' => 'Social Settings',
            'fields' => [
                [
                    'key' => 'ps_theme_settings_general_social_facebook',
                    'name' => 'social_facebook',
                    'label' => 'Facebook',
                    'type' => 'url',
                ],
                [
                    'key' => 'ps_theme_settings_general_social_twitter',
                    'name' => 'social_twitter',
                    'label' => 'Twitter',
                    'type' => 'url',
                ],
                [
                    'key' => 'ps_theme_settings_general_social_linkedin',
                    'name' => 'social_linkedin',
                    'label' => 'LinkedIn',
                    'type' => 'url',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-general-settings',
                    ],
                ],
            ],
        ] );

        /** 
         * disclosure fields [general] 
         * */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_general_disclosure_field_group',
            'title' => 'Disclosure Settings',
            'fields' => [
                [
                    'key' => 'ps_theme_settings_general_affiliate_disclosure',
                    'name' => 'affiliate_disclosure',
                    'label' => 'Affiliate Disclosure',
                    'type' => 'wysiwyg',
                    'toolbar' => 'basic',
                    'media_upload' => 0,
                ],
                [
                    'key' => 'ps_theme_settings_general_affiliate_disclosure_es',
                    'name' => 'affiliate_disclosure__es',
                    'label' => 'Affiliate Disclosure (ES)',
                    'type' => 'wysiwyg',
                    'toolbar' => 'basic',
                    'media_upload' => 0,
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-general-settings',
                    ],
                ],
            ],
        ] );

        /** 
         * Site Identity [general] 
         * */
        acf_add_local_field_group( [
            'key' => 'ps_theme_settings_general_site_identity_group',
            'title' => 'Site Identity',
            'fields' => [
                [
                    'key'           => 'ps_theme_site_identity_logo_dark',
                    'label'         => 'Dark Logo Version',
                    'name'          => 'dark_theme_logo',
                    'type'          => 'image',
                    'instructions'  => '',
                    'required'      => 0,
                    'return_format' => 'array',
                    'preview_size'  => 'thumbnail',
                    'library'       => 'all',
                    'min_width'     => 0,
                    'min_height'    => 0,
                    'max_width'     => 0,
                    'max_height'    => 0,
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'ps-theme-general-settings',
                    ],
                ],
            ],
        ] );
    }

    public static function register_paid_ads_page_fields() {
        /**
         * Header Fields for Paid Ads Template
         */
        acf_add_local_field_group([
            'key' => 'ps_pa_template',
            'title' => 'Header Settings',
            'menu_order' => 5,
            'fields' => [
                [
                    'key'   => 'ps_pa_template_title',
                    'name'  => 'title',
                    'label' => 'Title',
                    'type'  => 'text',
                    'default_value' => '<strong>Best VPNs</strong> for the ',
                ],
                [
                    'key'   => 'ps_pa_template_description',
                    'name'  => 'description',
                    'label' => 'Description',
                    'type'  => 'text',
                    'default_value' => 'Be secure and private online – choose the best VPN, picked specifically for you',
                ],
                [
                    'key'   => 'ps_pa_template_disclaimer',
                    'name'  => 'disclaimer',
                    'label' => 'Disclaimer',
                    'type'  => 'text',
                    'default_value' => 'If you purchase via links on our site, we may receive affiliate commissions.',
                ],
                [
                    'key'           => 'ps_pa_template_security',
                    'name'          => 'is_security',
                    'label'         => 'Security Icon',
                    'type'          => 'true_false',
                    'ui'            => 1,
                    'default_value' => 1,
                ],
                [
                    'key'   => 'ps_pa_template_security_text',
                    'name'  => 'security_text',
                    'label' => 'Security Text',
                    'type'  => 'text',
                    'default_value' => 'Security',
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'ps_pa_template_security',
                                'operator' => '==',
                                'value' => 1,
                            ],
                        ],
                    ],
                ],
                [
                    'key'           => 'ps_pa_template_privacy',
                    'name'          => 'is_privacy',
                    'label'         => 'Privacy Icon',
                    'type'          => 'true_false',
                    'ui'            => 1,
                    'default_value' => 1,
                ],
                [
                    'key'   => 'ps_pa_template_privacy_text',
                    'name'  => 'privacy_text',
                    'label' => 'Privacy Text',
                    'type'  => 'text',
                    'default_value' => 'Privacy',
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'ps_pa_template_privacy',
                                'operator' => '==',
                                'value' => 1,
                            ],
                        ],
                    ],
                ],
                [
                    'key'           => 'ps_pa_template_speed',
                    'name'          => 'is_speed',
                    'label'         => 'Speed Icon',
                    'type'          => 'true_false',
                    'ui'            => 1,
                    'default_value' => 1,
                ],
                [
                    'key'   => 'ps_pa_template_speed_text',
                    'name'  => 'speed_text',
                    'label' => 'Speed Text',
                    'type'  => 'text',
                    'default_value' => 'Speed',
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'ps_pa_template_speed',
                                'operator' => '==',
                                'value' => 1,
                            ],
                        ],
                    ],
                ],
                [
                    'key'   => 'ps_pa_template_banner_title',
                    'name'  => 'banner_title',
                    'label' => 'Banner Title',
                    'type'  => 'text',
                    'default_value' => 'How do we choose the Best?',
                ],
                [
                    'key'   => 'ps_pa_template_banner_text',
                    'name'  => 'banner_text',
                    'label' => 'Banner Text',
                    'type'  => 'textarea',
                    'default_value' => 'cybernews.com seeks to give the most relevant information about the tools we review. Our reviews are based both on objective (such as speed metrics) and subjective (e. g. user-friendliness, customer support) criteria. Service providers make constant updates regarding the provision of their services, thus, we do our best to keep up with them and change our reviews accordingly. However, please note the pricing could change quite frequently.',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'theme/paid-ads.php',
                    ],
                ],
            ],
        ]);

        /**
         * Floating Banner Fields for Paid Ads Template
         */
        acf_add_local_field_group([
            'key' => 'ps_pa_floating_banner',
            'title' => 'Floating Banner Settings',
            'menu_order' => 6,
            'fields' => [
                [
                    'key'   => 'ps_pa_floating_banner_small_description',
                    'name'  => 'fb_small_description',
                    'label' => 'Small Description',
                    'type'  => 'text',
                    'default_value' => 'Get Threat Protection for free!',
                ],
                [
                    'key'   => 'ps_pa_floating_banner_description',
                    'name'  => 'fb_description',
                    'label' => 'Description',
                    'type'  => 'text',
                    'default_value' => 'VPN 2-year plan 71% OFF + a gift',
                ],
                [
                    'key' => 'ps_pa_floating_banner_picture',
                    'name' => 'fb_picture',
                    'label' => 'Logo',
                    'type' => 'image',
                    'preview_size' => 'thumbnail',
                ],
                [
                    'key' => 'ps_pa_floating_banner_button_text',
                    'name' => 'fb_button_text',
                    'label' => 'Button Text',
                    'type' => 'text',
                    'default_value' => 'Get VPN',
                ],
                [
                    'key' => 'ps_pa_floating_banner_button_link',
                    'name' => 'fb_button_link',
                    'label' => 'Button Link',
                    'type' => 'text',
                    'default_value' => '#',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'theme/paid-ads.php',
                    ],
                ],
            ],
        ]);
    }

    public static function init_timber() {
        /**
         * This ensures that Timber is loaded and available as a PHP class.
         * If not, it gives an error message to help direct developers on where to activate
         */
        if ( !class_exists( 'Timber' ) ) {
            add_action(
                'admin_notices',
                function() {
                    echo '<div class="error"><p>Timber not activated.</p></div>';
                }
            );

            return;
        }

        /**
         * Sets the directories (inside your theme) to find .twig files
         */
        Timber::$dirname = array( 'templates', 'views' );

        /**
         * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
         * No prob! Just set this value to true
         */
        Timber::$autoescape = false;

        new TimberTheme();
    }

}