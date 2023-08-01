<?php

namespace ScTheme\Controllers;

use ScTheme\Taxonomies\AbstractTaxonomy;
use ScTheme\Taxonomies\StreamingCategoryTaxonomy;

/**
 * The Taxonomy Controller Class
 *
 * @author Yaidier Perez
 * */

class TaxonomyController {
    public static $instance     = null;
    public static $taxonomies   = [];

    public static function init() {
        self::add_taxonomies();
        self::register_extra_fields();
        self::add_hooks();
    }

    public static function add_taxonomies() {
        self::addTaxonomy( new StreamingCategoryTaxonomy() );
    }

    public static function register_extra_fields() {
        $all_taxonomies = self::$taxonomies;

        /**
         * Adding the post Category to the list
         */
        array_push( $all_taxonomies, 'category' );

        foreach( $all_taxonomies as $taxonomy ) {
            $taxonomy_name = $taxonomy;
            if( $taxonomy instanceof AbstractTaxonomy ) {
                $taxonomy_name = $taxonomy->getTaxonomyName();
            }           

            /**
             * Register Taxonomie Hook to show 
             * on the Add New Taxonomy page.
             */
            add_action( 
                $taxonomy_name . '_add_form_fields', 
                function( $term ) use ( $taxonomy_name ) {
                    self::add_taxonomy_extra_fields( $term, $taxonomy_name );
                } , 
                10, 
                1
            );

            /**
             * Register Taxonomie Hook to show 
             * on the Edit Taxonomy page.
             */
            add_action( 
                $taxonomy_name . '_edit_form_fields', 
                function( $term ) use ( $taxonomy_name ) {
                    self::add_taxonomy_extra_fields( $term, $taxonomy_name );
                } , 
                10,
                1
            );

            /**
             * Save Taxonomie Hook
             */
            add_action( 'edited_' . $taxonomy_name, array( self::class, 'save_taxonomy_extra_fields' ), 10, 2 );
            add_action( 'create_' . $taxonomy_name, array( self::class, 'save_taxonomy_extra_fields' ), 10, 2 );
        }

    }

    public static function add_taxonomy_extra_fields( $term, $taxonomy_name ) {
        $name = $taxonomy_name;

        if ( current_filter() == $taxonomy_name . '_edit_form_fields' ) {
            $short_description  = get_term_meta( $term->term_id, 'short_description', true );
            $all_news_text      = get_term_meta( $term->term_id, 'all_news_cat', true );
            ?>
            <tr class="form-field">
                <th valign="top" scope="row">
                    <label for="term_fields[short_description]"><?php _e( 'Short Description' ); ?></label>
                </th>
                <td>
                    <textarea class="large-text" cols="50" rows="5" id="term_fields[short_description]" name="term_fields[short_description]"><?php echo esc_textarea( $short_description ); ?></textarea>
                    <span class="description"><?php _e( 'Please enter desired description' ); ?></span>
                </td>
            </tr>
            <tr class="form-field term-group-wrap">
                <th scope="row">
                    <label for="cat_featured_img_id"><?php _e( 'Image', 'hero-theme' ); ?></label>
                </th>
                <td>
                    <?php $image_id = get_term_meta ( $term -> term_id, 'cat_featured_img_id', true ); ?>
                    <input type="hidden" id="cat_featured_img_id" name="cat_featured_img_id" value="<?php echo $image_id; ?>">
                    <div id="category-image-wrapper">
                        <?php if ( $image_id ) { ?>
                        <?php echo wp_get_attachment_image ( $image_id, 'thumbnail' ); ?>
                        <?php } ?>
                    </div>
                    <p>
                        <input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button" name="ct_tax_media_button" value="<?php _e( 'Add Image', 'hero-theme' ); ?>" />
                        <input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove" name="ct_tax_media_remove" value="<?php _e( 'Remove Image', 'hero-theme' ); ?>" />
                    </p>
                </td>
            </tr>

            <?php if( $taxonomy_name == 'category' ) : ?>
                <tr class="form-field">
                    <th valign="top" scope="row">
                        <label for="term_fields[all_news_cat]"><?php _e( 'All News text' ); ?></label>
                    </th>
                    <td>    
                        <input type="text" id="term_fields[all_news_cat]" name="term_fields[all_news_cat]" value="<?php echo esc_attr( $all_news_text ); ?>" >
                    </td>
                </tr>
            <?php endif; ?>

        <?php } elseif ( current_filter() == $taxonomy_name . '_add_form_fields' ) { ?>
            <div class="form-field">
                <label for="term_fields[short_description]"><?php _e( 'Desired Title Added' ); ?></label>
                <textarea cols="40" rows="5" id="term_fields[short_description]" name="term_fields[short_description]"></textarea>
                <p class="description"><?php _e( 'Please enter desired description' ); ?></p>
            </div>
            <div class="form-field term-group">
                <label for="cat_featured_img_id"><?php _e('Image', 'hero-theme'); ?></label>
                <input type="hidden" id="cat_featured_img_id" name="cat_featured_img_id" class="custom_media_url" value="">
                <div id="category-image-wrapper"></div>
                <p>
                    <input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button" name="ct_tax_media_button" value="<?php _e( 'Add Image', 'hero-theme' ); ?>" />
                    <input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove" name="ct_tax_media_remove" value="<?php _e( 'Remove Image', 'hero-theme' ); ?>" />
                </p>
            </div>
        <?php } ?>

        <?php

    }

    public static  function save_taxonomy_extra_fields( $term_id ) {
        if ( !isset( $_POST['term_fields'] ) ) {
            return;
        }

        foreach ( $_POST['term_fields'] as $key => $value ) {
            update_term_meta( $term_id, $key, sanitize_text_field( $value ) );
        }

        if( isset( $_POST['cat_featured_img_id'] ) && '' !== $_POST['cat_featured_img_id'] ){
            $image = $_POST['cat_featured_img_id'];
            add_term_meta( $term_id, 'cat_featured_img_id', $image, true );
        }

        if( isset( $_POST['cat_featured_img_id'] ) && '' !== $_POST['cat_featured_img_id'] ){
            $image = $_POST['cat_featured_img_id'];
            update_term_meta ( $term_id, 'cat_featured_img_id', $image );
          } 
          else {
            update_term_meta ( $term_id, 'cat_featured_img_id', '' );
        }
    }

    public static function add_hooks() {
        add_action( 'init', [self::class, 'registerTaxonomies'] );
    }

    public static function addTaxonomy( AbstractTaxonomy $taxonomy ) {
        array_push( self::$taxonomies, $taxonomy );
    }

    public static function registerTaxonomies() {
        foreach ( self::$taxonomies as $taxonomy ) {
            $taxonomy->register();
        }
    }
}
