<?php

namespace ScTheme\Resources;

use ScTheme\PostTypes\StreamingPostType;

class Utils {

    public static function get_taxonomy_class_name( $post_type ) {
        switch ( $post_type ) {
            case StreamingPostType::getPostTypeNameStatic():
                $taxonomy = 'StreamingCategoryTaxonomy';
                break;
            default: 
                $taxonomy = 'category';
                break;
        }

        return $taxonomy;
    }

    public static function get_posttype_from_taxonomy_name( $taxonomy_name ){
        $post_type = 'sc-' . $taxonomy_name;
        return str_replace( '-cat', '', $post_type );
    }

    public static function get_taxonomy_name( $taxonomy, $post_type ) {
        if ( !$taxonomy ) {
            switch ( $post_type ) {
                case 'post':
                    $taxonomy = 'category';
                    break;
                default:
                    $taxonomy_class_name = self::get_taxonomy_class_name( $post_type );
            }
        }

        if( isset( $taxonomy_class_name ) ){
            $taxonomy = call_user_func( array( 'ScTheme\Taxonomies\\' . $taxonomy_class_name, 'getTaxonomyNameStatic' ) );
        }

        return $taxonomy;
    }

    public static function getPrimaryCategory($post_id, $taxonomy = 'category', $post_type = 'post') {
        $taxonomy = self::get_taxonomy_name( $taxonomy, $post_type );

        $primary_category_id = get_post_meta($post_id, '_yoast_wpseo_primary_' . $taxonomy, true);
        if ($primary_category_id) {
            return new \Timber\Term($primary_category_id, $taxonomy);
        }

        $terms = wp_get_post_terms($post_id, $taxonomy);
        
        return !empty($terms) ? new \Timber\Term($terms[0]->term_id, $taxonomy) : null;
    }

    public function getTerm() {
        global $wp;
        $current_url = home_url(add_query_arg(array(), $wp->request));
        return $current_url . "/";
    }
}
