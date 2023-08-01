<?php

namespace ScTheme\PostTypes;

abstract class AbstractPostType {
    const post_type_name            = null;
    const skip_registration         = false;
    const singular_name             = null;
    const plural_name               = null;
    const menu_icon                 = null;
    const rewrite                   = null;
    const supports                  = ['title', 'editor', 'thumbnail', 'author'];
    const taxonomies                = [];
    const is_public                 = false;
    const is_hierarchical           = false;
    const is_excluded_from_search   = true;
    const is_publicly_queryable     = false;
    const is_available_in_rest      = true;
    const default_subheader_title   = '';
    const default_subheader_intro   = '';
    
    public $has_archive             = false;

    public static function getPostTypeNameStatic() {
        return static::post_type_name;
    }

    public function register() {
        if (!static::skip_registration) {
            $this->has_archive = $this->get_category_taxonomy_slug();

            register_post_type(static::post_type_name, [
                'labels' => [
                    'name'          => static::plural_name,
                    'singular_name' => static::singular_name,
                    'add_new_item'  => 'Add New ' . static::singular_name,
                    'all_items'     => 'All ' . static::plural_name,
                    'edit_item'     => 'Edit ' . static::singular_name,
                ],
                'public'                => static::is_public,
                'hierarchical'          => static::is_hierarchical,
                'has_archive'           => $this->has_archive,
                'exclude_from_search'   => static::is_excluded_from_search,
                'publicly_queryable'    => static::is_publicly_queryable,
                'show_ui'               => true,
                'show_in_rest'          => static::is_available_in_rest,
                'menu_icon'             => static::menu_icon,
                'supports'              => static::supports,
                'rewrite'               => static::rewrite,
                'taxonomies'            => static::taxonomies ?? $this->getTaxonomies(),
            ]);
        }

        $this->afterRegister();
    }

    public function getTaxonomies() {
        return [];
    }

    public static function get_category_taxonomy_slug() {
    }

    public function afterRegister() {
    }

    public function getPostTypeName() {
        return static::post_type_name;
    }

    public static function modify_permalink( $post_link, $post, $primary_category, $rewrite_slug ){
        if ( function_exists( 'pll_current_language' ) ) {
            $post_lang      = pll_get_post_language( $post->ID );
            $category_slug  = $primary_category->slug;
            
            if( $post_lang == 'en' ){
                // $cpt_slug       = static::get_category_taxonomy_slug(); 
                $replace_string = $category_slug;

            }
            else {
                // $cpt_slug       = get_field( static::post_type_name . '_archive_slug_' . $post_lang, 'option' );
                $replace_string = $category_slug;

            }
        }
        else {
            $term_link      = parse_url(  $primary_category->link  );
            $term_link      = $term_link['path'];
            $replace_string = trim( $term_link, '/' );
            
        }
        
        return str_replace( $rewrite_slug, $replace_string, $post_link );
    }

    public function register_tldr_fields( $post_type_name, $menu_order = 10 ) {
        acf_add_local_field_group([
            'key' => $post_type_name . '_general_tldr_group',
            'title' => 'TLDR Settings',
            'menu_order' => $menu_order,
            'fields' => [
                [
                    'key' => $post_type_name . '_tldr_title',
                    'name' => 'tldr_title',
                    'label' => 'TLDR Title',
                    'type' => 'text',
                    'default_value' => 'Sneak peek at ',
                ],
                [
                    'key' => $post_type_name . '_tldr_content',
                    'name' => 'tldr_content',
                    'label' => 'TLDR Content',
                    'type' => 'wysiwyg',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => $post_type_name,
                    ],
                ],
            ],
        ]);
    }

    public function register_facts_checked_fields( $post_type_name, $menu_order = 10 ) {
        $authors = get_users([
            'number'                => -1,
            'orderby'               => 'post_count',
            'order'                 => 'DESC',
            'has_published_posts'   => true,
            'fields'                => ['ID', 'display_name'],
        ]);

        $authors_array = [];
        foreach( $authors as $author ){
            $authors_array[$author->ID] = $author->display_name;
        }

        acf_add_local_field_group([
            'key' => $post_type_name . '_factscheck_group',
            'title' => 'Facts Checked',
            'menu_order' => $menu_order,
            'fields' => [
                [
                    'key' => $post_type_name . '_key_factscheck_select',
                    'name' => 'factscheck_select_author',
                    'label' => 'Author',
                    'type' => 'select',
                    'allow_null' => 'none',
                    'choices' => $authors_array,
                ],
                [
                    'key' => $post_type_name . '_key_factscheck_author',
                    'name' => 'factscheck_author',
                    'label' => 'Author',
                    'type' => 'text',
                    'conditional_logic' => [
                        [
                            [
                                'field' => $post_type_name . '_key_factscheck_select',
                                'operator' => '==',
                                'value' => '',
                            ],
                        ],
                    ],
                ],
                [
                    'key' => $post_type_name . '_key_factscheck_avatar',
                    'name' => 'factscheck_avatar',
                    'label' => 'Avatar',
                    'type' => 'image',
                    'conditional_logic' => [
                        [
                            [
                                'field' => $post_type_name . '_key_factscheck_select',
                                'operator' => '==',
                                'value' => '',
                            ],
                        ],
                    ],
                ],
                [
                    'key' => $post_type_name . '_key_factscheck_url',
                    'name' => 'factscheck_url',
                    'label' => 'Website URL',
                    'type' => 'text',
                    'conditional_logic' => [
                        [
                            [
                                'field' => $post_type_name . '_key_factscheck_select',
                                'operator' => '==',
                                'value' => '',
                            ],
                        ],
                    ],
                ],
                [
                    'key'   => $post_type_name . '_key_factscheck_desc',
                    'name'  => 'factscheck_desc',
                    'label' => 'Description',
                    'type'  => 'textarea',
                    'conditional_logic' => [
                        [
                            [
                                'field' => $post_type_name . '_key_factscheck_select',
                                'operator' => '==',
                                'value' => '',
                            ],
                        ],
                    ],
                ],
                [
                    'key'   => $post_type_name . '_key_factscheck_pos',
                    'name'  => 'factscheck_pos',
                    'label' => 'Job Title',
                    'type'  => 'text',
                    'conditional_logic' => [
                        [
                            [
                                'field'     => $post_type_name . '_key_factscheck_select',
                                'operator'  => '==',
                                'value'     => '',
                            ],
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => $post_type_name,
                    ],
                ],
            ],
        ]);
    }

    public function registerArchiveSettings() {
        if ( static::post_type_name === 'post' ) {
            $post_type      = 'post'; 
            $parent_slug    = 'edit.php';
            $default_slug   = 'news';
        }
        else {
            $post_type      = str_replace( 'sc-', '', static::post_type_name ?? '' );
            $parent_slug    = 'edit.php?post_type=' . static::post_type_name;
            $default_slug   = $this->has_archive;
        }

        if( $post_type === '' ) {
            return;
        }

        $meataboxes_order = [
            'en' => 10,
            'es' => 11,
            'de' => 12,
            'pt' => 13,
        ];

        /**
         * Get all Polylang languages
         */
        $en_lang_flag_img = '';
        if ( function_exists( 'pll_languages_list' ) ) {
 
            $pl_languages       = pll_languages_list( array( 'fields' => array() ) );
            $en_language_object = $pl_languages[0];

            if( $en_language_object->slug == 'en' ){
                $en_lang_flag_img = ' (English) <img src="' . $en_language_object->flag_url . '">';
            }
        }
        
        acf_add_options_page( [
            'page_title'    => static::singular_name . ' Popup Settings',
            'menu_title'    => static::singular_name . ' Popup Settings',
            'menu_slug'     => 'ps-theme-' . $post_type . '-popup-settings',
            'parent_slug'   => $parent_slug,
            'capability'    => 'manage_options',
            'redirect'      => false,
            'autoload'      => true,
        ] );

        acf_add_options_page( [
            'page_title'    => static::singular_name . ' Archive Settings',
            'menu_title'    => static::singular_name . ' Archive Settings',
            'menu_slug'     => 'ps-theme-' . $post_type . '-archive-settings',
            'parent_slug'   => $parent_slug,
            'capability'    => 'manage_options',
            'redirect'      => false,
            'autoload'      => true,
        ] );

        acf_add_local_field_group( [
            'key'           => 'id_' . static::post_type_name . '_archive_settings_field_group',
            'title'         => static::singular_name . ' Archive Settings' . $en_lang_flag_img,
            'menu_order'    => $meataboxes_order['en'],
            'fields'        => [
                [
                    'key'           => 'id_' . static::post_type_name . '_archive_settings_title',
                    'name'          => static::post_type_name . '_archive_title',
                    'label'         => 'Title',
                    'type'          => 'text',
                    'default_value' => static::default_subheader_title,
                ],
                [
                    'key'           => 'id_' . static::post_type_name . '_archive_settings_intro',
                    'name'          => static::post_type_name . '_archive_intro',
                    'label'         => 'Intro',
                    'type'          => 'wysiwyg',
                    'default_value' => static::default_subheader_intro,
                ],
            ],
            'location' => [
                [
                    [
                        'param'     => 'options_page',
                        'operator'  => '==',
                        'value'     => 'ps-theme-' . $post_type . '-archive-settings',
                    ],
                ],
            ],
        ] );

        /**
         * Get all Polylang languages
         */
        if( !isset( $pl_languages ) ){
            $english_lang           = new \stdClass();
            $english_lang->name     = 'English';
            $english_lang->slug     = 'en';
            $english_lang->flag_url = '';

            $pl_languages[] = $english_lang;
        }

        
        foreach( $pl_languages as $pl_language ){

            $language_name = $pl_language->name;
            
            /**
             * Archive Settings
             */
            acf_add_local_field_group( [
                'key'           => 'id_' . static::post_type_name . '_popup_settings_field_group_' . $pl_language->slug,
                'title'         => static::singular_name . ' Popup Settings(' . $language_name . ') <img src="' . $pl_language->flag_url . '">',
                'fields'        => [
                    [
                        'key'   => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                        'name'  => static::post_type_name . '_popup_show_' . $pl_language->slug,
                        'label' => 'Show Popup',
                        'type'  => 'true_false',
                        'ui'    => 1,
                    ],
                    [
                        'key'       => 'id_' . static::post_type_name . '_popup_theme_' . $pl_language->slug,
                        'name'      => static::post_type_name . '_popup_theme_' . $pl_language->slug,
                        'label'     => 'Theme',
                        'type'      => 'select',
                        'default_value' => 'default',
                        'choices'   => [
                            'default'       => 'Default',
                            'nordpass'      => 'NordPass',
                        ],
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_pre_title_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_pre_title_' . $pl_language->slug,
                        'label'         => 'Popup Pre Title',
                        'type'          => 'text',
                        'default_value' => 'EXCLUSIVE OFFER',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_image_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_image_' . $pl_language->slug,
                        'label'         => 'Popup Image',
                        'type'          => 'image',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_theme_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 'default',
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_title_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_title_' . $pl_language->slug,
                        'label'         => 'Popup Title',
                        'type'          => 'text',
                        'default_value' => 'Get 3 Months Free',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_banner_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_banner_'. $pl_language->slug,
                        'label'         => 'Popup Banner Text',
                        'type'          => 'text',
                        'default_value' => 'of our #1 rated VPN',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [ 
                        'key'       => 'id_' . static::post_type_name . '_popup_settings_popup_items_' . $pl_language->slug,
                        'name'      => static::post_type_name . '_popup_items_' . $pl_language->slug,
                        'label'     => 'Popup List Items',
                        'type'      => 'repeater',
                        'layout'    => 'table',
                        'sub_fields' => [
                            [
                                'key'   => 'id_' . static::post_type_name . '_popup_settings_popup_item',
                                'name'  => 'item',
                                'label' => 'Item List',
                                'type'  => 'text',
                            ],
                        ],
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_'. $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_btn_text_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_btn_text_' . $pl_language->slug,
                        'label'         => 'Popup Button Text',
                        'type'          => 'text',
                        'default_value' => 'Get NordVPN',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_btn_url_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_btn_url_' . $pl_language->slug,
                        'label'         => 'Affiliate Link',
                        'type'          => 'url',
                        'default_value' => 'https://streamingera.com/go/nordvpn/',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
                                    'operator'  => '==',
                                    'value'     => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'key'           => 'id_' . static::post_type_name . '_popup_settings_popup_cta_disclosure_' . $pl_language->slug,
                        'name'          => static::post_type_name . '_popup_cta_disclosure_' . $pl_language->slug,
                        'label'         => 'Popup CTA Disclosure',
                        'type'          => 'text',
                        'default_value' => '30-day no-questions-asked money-back guarantee',
                        'conditional_logic' => [
                            [
                                [
                                    'field'     => 'id_' . static::post_type_name . '_popup_settings_show_' . $pl_language->slug,
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
                            'value'     => 'ps-theme-' . $post_type . '-popup-settings',
                        ],
                    ],
                ],
            ] );        

            /**
             * Archive Settings
             */
            if( $pl_language->slug == 'en' ){
                continue;
            }
            acf_add_local_field_group( [
                'key'           => 'id_' . static::post_type_name . '_archive_settings_field_group_' . $pl_language->slug ,
                'title'         => static::singular_name . ' Archive Settings (' . $language_name . ') <img src="' . $pl_language->flag_url . '">',
                'menu_order'    => $meataboxes_order[$pl_language->slug] ?? 20,
                'fields'        => [
                    [
                        'key'   => 'id_' . static::post_type_name . '_archive_settings_title_' . $pl_language->slug,
                        'name'  => static::post_type_name  . '_archive_title_' . $pl_language->slug,
                        'label' => 'Title',
                        'type'  => 'text',
                    ],
                    [
                        'key'   => 'id_' . static::post_type_name . '_archive_settings_intro_' . $pl_language->slug,
                        'name'  => static::post_type_name  . '_archive_intro_' . $pl_language->slug,
                        'label' => 'Intro',
                        'type'  => 'wysiwyg',
                    ],
                    [
                        'key'   => 'id_' . static::post_type_name . '_archive_settings_breadcrumbs_' . $pl_language->slug,
                        'name'  => static::post_type_name  . '_archive_slug_breadcrumbs_' . $pl_language->slug,
                        'label' => 'Breadcrumbs Name',
                        'type'  => 'text',
                        'default_value' => $default_slug,
                    ],
                    [
                        'key'   => 'id_' . static::post_type_name . '_archive_settings_slug_' . $pl_language->slug,
                        'name'  => static::post_type_name  . '_archive_slug_' . $pl_language->slug,
                        'label' => 'Slug',
                        'type'  => 'text',
                        'default_value' => $default_slug,
                    ],
                ],
                'location' => [
                    [
                        [
                            'param'     => 'options_page',
                            'operator'  => '==',
                            'value'     => 'ps-theme-' . $post_type . '-archive-settings',
                        ],
                    ],
                ],
            ] );
        }
    }
}
