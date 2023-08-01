<?php

namespace ScTheme\Controllers;

use ScTheme\PostTypes\AbstractPostType;
use ScTheme\PostTypes\StreamingPostType;

/**
 * The Post Type Controller Class
 *
 * @author Yaidier Perez
 * */

class PostTypeController {

    public static $instance     = null;
    public static $post_types   = [];

    public static function init() {
        if ( is_null( self::$instance ) ) {
            self::add_all_post_types();
            self::add_post_types_support();
            self::regiester_all_post_types();
            self::register_hooks();

            self::$instance = new self();
        }
    }

    public static function set_prefix_to_id_of_post_content_headings( $post_content ){
        $has_content_changed    = false;
        $content_blocks         = parse_blocks( $post_content );
        $tags                   = [ 'h2', 'h3' ];

        foreach( $content_blocks as &$block ){
            $block_name = $block['blockName'] ?? '';
            $content    = '';

            if( 'acf/ps-alert-box' === $block_name ) {
                $content = $block['attrs']['data']['content'] ?? false;
            }

            if( 'core/heading' === $block_name ){
                $content = $block['innerContent'][0] ?? false;
            }

            if( !$content ) {
                continue;
            }

            $dom_element = new \DOMDocument();
            $dom_element->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'UTF-8' ) );

            foreach( $tags as $tag ){
                foreach( $dom_element->getElementsByTagName( $tag ) as $child ){
                    /**
                     * Get Id attribute of the element.
                     */
                    $id_attr = $child->getAttribute( 'id' );

                    /**
                     * Ids should be on lowercase.
                     */
                    $heading_name = strtolower( $child->nodeValue );

                    /**
                     * Replace spaces by dashes.
                     */
                    $heading_name = str_replace( ' ', '-', $heading_name );

                    /**
                     * Remove special characters ( brakets, dots, etc).
                     */
                    $heading_name = preg_replace( '/[^A-Za-z0-9\-]/', '', $heading_name );

                    /**
                     * Replaces multiple hyphens with single one.
                     */
                    $heading_name = preg_replace( '/-+/', '-', $heading_name );

                    /**
                     * If it is core heading and id already starts with 'h-', then just
                     * leaves it as Yoast scripts updates the id when the value of the element changes.
                     */
                    if( ( 'core/heading' === $block_name ) && ( substr( $id_attr, 0, 2 ) === "h-" ) ){
                        continue;
                    }

                    /**
                     * Set 'h-' prefix.
                     */
                    $heading_name = 'h-' . $heading_name;

                    /**
                     * Continue if current id is equal to calculated id.
                     */
                    if( $id_attr === $heading_name ){
                        continue;
                    }

                    /**
                     * Set the new id attribute with the 'h-' prefix.
                     */
                    $child->setAttribute( 'id', $heading_name );

                    /**
                     * If we reach this point it means we modified something,
                     * therefor we need to update the post content.
                     */
                    $has_content_changed = true;
                }

                $output = $dom_element->saveHTML();
            }

            /**
             * Remove document and body wrap from $output
             */
            $output = substr( $output, strpos( $output, '<body>' ) + 6 );
            $output = substr( $output, 0, strpos( $output, '</body>' ) );

            if( 'acf/ps-alert-box' === $block_name ) {
                $block['attrs']['data']['content'] = $output;
            }

            if( 'core/heading' === $block_name ){
                $block['innerContent'][0]   = $output;
                $block['innerHTML']         = $output;
            }
        }

        return $has_content_changed ? serialize_blocks( $content_blocks ) : false;
    }

    public static function set_ids_prefix( $post_id = 0, $post = null ) {
        if( !$post_id || ! $post ){
            return;
        }
        
        /*
        * If this is an autosave, our form has not been submitted,
        * so we don't want to do anything.
        */
        if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) || isset( $_REQUEST['bulk_edit'] ) ) {
            return $post_id;
        } 

        /**
         * Retun if it is a post revision.
         */
        if ( wp_is_post_revision( $post_id ) ){
            return $post_id;
        }

        /**
         * Return if user can't edit posts.
         */
        if ( !current_user_can( 'edit_posts', $post_id ) ) {
            return $post_id;
        }
        
        /**
         * Return if we are not in "reivew" post types.
         */
        $allow_post_types = ['sc-streaming pspt-vpn', 'pspt-antivirus', 'pspt-cloud', 'pspt-email', 'pspt-geoblocking', 'pspt-password', 'pspt-review', 'pspt-security', 'page'];
        if( !in_array( $post->post_type, $allow_post_types ) ){
            return $post_id;
        }   

        /**
         * Return if there is nothing to fix.
         */
        if( !$post_content = self::set_prefix_to_id_of_post_content_headings( $post->post_content ) ) {
            return $post_id;
        }

        /**
         * Remove this hook temporally before updating the 
         * post, in order to avoid infinite loop.
         */
        remove_action( 'save_post', [ self::class, 'set_ids_prefix' ], PHP_INT_MAX - 10 );

        /**
         * Update new post content
         */
        wp_update_post( wp_slash( [ 'ID' => $post_id, 'post_content' => $post_content ] ) );

        /**
         * Rehook the function
         */
        add_action( 'save_post', [ self::class, 'set_ids_prefix' ] );
    }

    public static function register_hooks(){
        /**
         * Be sure to have the prefix "h-" in all ids of 
         * the heading blocks, once the post get's saved.
         */
        add_action( 'save_post', [ self::class, 'set_ids_prefix' ], PHP_INT_MAX - 10, 2);
    }

    public static function add_all_post_types() {
        self::add_post_type( new StreamingPostType() );
    }

    public static function add_post_types_support() {
        add_action( 'init', function(){
            add_post_type_support( 'page', 'excerpt' );
        } );
    }

    public static function regiester_all_post_types() {
        add_action( 'init', function() {
            foreach ( self::$post_types as $post_type ) {
                $post_type->register();
            }
        } );
    }

    public static function get_post_types() {
        return self::get_instance()::$post_types;
    }

    public static function get_instance() {
        if ( is_null( self::$instance ) ) {
            self::init();
        }

        return self::$instance;
    }

    public static function add_post_type( AbstractPostType $post_type ) {
        array_push( self::$post_types, $post_type );
    }

}
