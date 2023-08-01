<?php


namespace ScTheme\Taxonomies;


use SavvyTheme\Resources\Utilities;

abstract class AbstractTaxonomy {
    const taxonomy_name         = '';
    const object_type           = '';
    const skip_registration     = false;
    const singular_name         = null;
    const plural_name           = null;
    const is_public             = false;
    const is_hierarchical       = false;
    const is_available_in_rest  = true;
    const is_in_nav_menus       = false;

    public static $rewrite      = null;
    public static $default_slug = '';

    public static function getTaxonomyNameStatic() {
        return static::taxonomy_name;
    }

    public static function get_slug(){
        $slug = static::$rewrite['slug'] ?? false;
    
        return $slug;
    }

    public static function get_default_slug(){
        $default_slug = static::$default_slug;
    
        return $default_slug;
    }


    public function register() {
        if ( static::skip_registration ){
            return;
        }
        
        /**
         * Saving the default slug (english language)
         */
        static::$default_slug = static::$rewrite['slug'] ?? false;

        register_taxonomy(
            static::taxonomy_name,
            static::object_type,
            [
                'labels' => [
                    'name'          => static::plural_name,
                    'singular_name' => static::singular_name,
                    'add_new_item'  => 'Add New ' . static::singular_name,
                    'all_items'     => 'All ' . static::plural_name,
                    'edit_item'     => 'Edit ' . static::singular_name,
                ],
                'hierarchical'      => static::is_hierarchical,
                'public'            => static::is_public,
                'show_ui'           => true,
                'show_admin_column' => true,
                'show_in_rest'      => static::is_available_in_rest,
                'show_in_nav_menus' => static::is_in_nav_menus,
                'rewrite'           => static::$rewrite,
            ]
        );

        self::modify_link();
        self::set_taxonomy_and_terms_rewrite_rules();
    }

    public static function set_english_rewrite_rules() {
        $url = $_SERVER['REQUEST_URI'];

        /**
         * Do not apply custom rewrite rules to the blog.
         */
        if( strpos( $url, '/blog/' ) !== false ){
            return;
        }
       
        /**
         * Rewrite rule for post name segment of the url.
         */
        add_rewrite_rule(
            '(.+?)/(.+?)/?$',
            'index.php?sc-streaming=streaming-1',
            'top'
        );
        
        /**
         * Rewrite rule for term feed.
         */
        add_rewrite_rule(
            '(.+?)/feed/?$',
            'index.php?'. static::taxonomy_name .'=$matches[1]&feed=rss2',
            'top'
        );

        /**
         * Rewrite rule for term pagination.
         */
        add_rewrite_rule(
            '(.+?)/page/([0-9]+)/?$',
            'index.php?'. static::taxonomy_name .'=$matches[1]&paged=$matches[2]',
            'top'
        );

        /**
         * Rewrite rule for term slug segment of the url.
         */
        add_rewrite_rule(
            '(.+?)?$',
            'index.php?&'. static::taxonomy_name .'=$matches[1]]',
            'top'
        );
    }

    /**
     * Set rewrite rules for different languages
     */
    public static function set_taxonomy_and_terms_rewrite_rules(){
        self::set_english_rewrite_rules();

        /**
         * IMPORTANT!!! Other Languages rewrite rule are still broken for this site.
         * Need to fix this later on.
         * 
         * self::set_other_languages_rewrite_rules();
         * 
         */
        
        flush_rewrite_rules();
    }

    public function modify_link() { 
        add_filter( 'term_link', function( $url, $term, $taxonomy ) { 

            return str_replace( $term->taxonomy . '/', '', $url );
        }, 10, 3);
    }

    public function getTaxonomyName() {
        return static::taxonomy_name;
    }
}
