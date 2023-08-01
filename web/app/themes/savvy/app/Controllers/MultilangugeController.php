<?php

namespace SavvyTheme\Controllers;

use SavvyTheme\Resources\Utils;
use SavvyTheme\Resources\Utilities;
use Google\Cloud\Translate\V2\TranslateClient;

/**
 * The Multilanguage Controller Class
 *
 * @author Yaidier Perez
 * */


class MultilangugeController {

    public static function init(){
        self::init_site_language();
        self::filter_switcher_links();
        self::auto_translate_on_pll_new_translation();
        self::change_authors_links();
        self::add_custom_rewrite_for_ta_plugin();
    }

    public static function add_custom_rewrite_for_ta_plugin() {
        if( is_admin() ){
            return;
        }
        
        /**
         * Get the languages string.
         */
        $languages_string = Utilities::get_languages_list_for_regex();

        /**
         * Rewrite rule for post name segment of the url.
         */
        add_rewrite_rule(
            '('. $languages_string .')?/go/(.+?)/?$',
            'index.php?redirect_to_ta_plugin=$matches[2]',
            'top'
        );

        /**
         * Register the new paramenter.
         */
        add_filter( 'query_vars', function ($vars) {
            $vars[] = 'redirect_to_ta_plugin';
            
            return $vars;
        });

        /**
         * Redirect to ta declared url if paramenter is present.
         */
        add_action( 'wp', function() {
            if ( $redirect_path = get_query_var( 'redirect_to_ta_plugin' ) ) {
                $redirect_to = get_home_url() . '/go/' . $redirect_path;

                wp_redirect( $redirect_to );
                exit;
            }
        } );
    }

    public static function change_authors_links(){
        /**
         * If polyulang isn't present, then return.
         */
        if( !function_exists( 'pll_current_language' ) ){
            return;
        }

        add_filter( 'author_link', function ( $link, $author_id, $author_nicename ) {
            $current_language = pll_current_language();

            /**
             * Get the local's author page.
             */
            $author_page_object         = get_page_by_path( 'author', OBJECT, 'page' );

            if( !$author_page_object ) {
                return $link;
            }

            $author_page_tranlations    = pll_get_post_translations( $author_page_object->ID );
            $translated_author_page     = get_post( $author_page_tranlations[ $current_language ] );
            $link                       = Utilities::replace_archive_slug( $link, $translated_author_page->post_name, false );
 
            return $link;
        }, 10, 3 );
    }

    public static function init_site_language() {
        if ( is_admin() && !wp_doing_ajax() ) {
            return;
        }

        /**
         * Load Theme Textdomain
         */
        add_action( 'after_setup_theme', function () {
            load_theme_textdomain( 'savvy', SAVVY_THEME_DIR . '/languages' );
        } );
    }

    public static function auto_translate_on_pll_new_translation() {
        /**
         * Set elegible posts for autotranslate.
         */
        $elegible_posts_types = [
            'pspt-vpn', 
            'pspt-antivirus', 
            'pspt-cloud', 
            'pspt-email', 
            'pspt-geoblocking', 
            'pspt-password', 
            'pspt-review', 
            'pspt-security'
        ];
        
        /**
         * We are not going to create a language version of a post using the Polylang way,
         * so we need to change the link in order to add our own parameter.
         */
        add_filter( 'pll_get_new_post_translation_link', function( $link, $language, $post_id ) use ( $elegible_posts_types ) {
            if( !is_admin() ){
                return;
            }

            /**
             * If current post type isn't elegible for auto translate,
             * then return.
             */
            if( !in_array( get_post_type( $post_id ), $elegible_posts_types ) ){
                return $link;
            }

            $paged = isset( $_GET['paged'] ) ? '&paged=' . $_GET['paged'] : '';

            $link .= '&auto_translate=yes' . $paged;
            $link = str_replace( 'post-new.php', 'edit.php', $link );
        
            return $link; 
        }, 10, 3 );

        /**
         * On the adming we check if the paramenter "auto_translate" is present in the url,
         * if so, then we clone the current post into a new one using our own way.
         * 
         * After the post gets inserted using wp_insert_post then we set the taxonomy and 
         * translate the post content using the wp_update_post
         */
        add_action( 'wp_loaded', function() {
            if( !is_admin() ){
                return;
            }
        
            $is_auto_translate  = $_GET['auto_translate']   ?? false;
            $from_post          = $_GET['from_post']        ?? false;
            $new_lang           = $_GET['new_lang']         ?? false;
            $post_type          = $_GET['post_type']        ?? false;
        
        
            if( !$is_auto_translate || !$from_post || !$new_lang || !$post_type ){
                return;
            }
        
            $from_post_id = (int)$from_post;
        
            /**
             * Getting reference post translations
             */
            $post_translations = pll_get_post_translations( $from_post_id );
        
            /**
             * Getting the reference post
             */
            $reference_post = get_post( $from_post_id );


            /**
             * If the post we are trying to create 
             * already has an translation, then return
             */
            if( isset( $post_translations[$new_lang] ) ){
                return;
            }
        

            /**
             * New Post Arguments
             */
            $args = [
                'post_content'          => $reference_post->post_content,
                'post_content_filtered' => $reference_post->post_content_filtered,
                'post_title'            => $reference_post->post_title,
                'post_excerpt'          => $reference_post->post_excerpt,
                'post_type'             => $reference_post->post_type,
                'comment_status'        => $reference_post->comment_status,
                'ping_status'           => $reference_post->ping_status,
                'post_name'             => $reference_post->post_name,
                'post_parent'           => $reference_post->post_parent,
            ];

            if( $post_type == 'post' ){
                $args['post_category'] = wp_get_post_categories( $reference_post->ID ) ?? array();

            }
            else {
                $post_type_object   = get_post_type_object( $post_type );
                $post_taxonomy      = $post_type_object->taxonomies[0];
                $terms              = get_the_terms( $from_post_id, $post_taxonomy );

                $terms_ids          = [];
                foreach( $terms as $term ) {
                    $terms_ids[] = $term->term_id;
                }
            }
            
            /**
             * Inserting the Post
             */
            $new_post_id = wp_insert_post( wp_slash( $args ) );
            if( is_wp_error( $new_post_id ) ){
                Utilities::display_admin_notice( 'It wasn\'t possible to create the translated version of the post. Error: ' . $new_post_id->get_error_message() , 'error' );
                return;
            }

            /**
             * Updating the Terms if they are set
             */
            if( isset( $terms_ids ) ){
                $response_term = wp_set_post_terms( $new_post_id, $terms_ids, $post_taxonomy );

                if( is_wp_error( $response_term ) ){
                    Utilities::display_admin_notice( 'It wasn\'t possible to add the Terms to the new post. Error: ' . $response_term->get_error_message() , 'error' );
                    return;
                }

                if( !$response_term ){
                    Utilities::display_admin_notice( 'It wasn\'t possible to add the Terms to the new post.', 'error' );
                    return;
                }
            }
        
            /**
             * Update the posts translations with the new post id
             */
            $post_translations[$new_lang] = $new_post_id;
            pll_save_post_translations( $post_translations );
        
            /**
             * Translating all the content of the post
             */
            $options = [
                'post_title',
                'post_name',
                'post_content',
                'post_meta___yoast_wpseo_metadesc',
                'post_meta___yoast_wpseo_focuskw',
            ];

            if( $post_type == 'post' ){
                array_push( $options, 'post_meta__summary_bullets' );
            }
            else {
                array_push( $options, 'post_meta__intro', 'post_meta__tldr_title', 'post_meta__tldr_content' );
            }

            $translate_response = self::translate_post( $new_post_id, $new_lang, $options );

            if( isset( $translate_response['error'] ) ){
                Utilities::display_admin_notice( 'It wasn\'t possible to Translate the post using the GT Api. Error:' . $translate_response['error'] , 'error' );
                return;
            }

            if( is_wp_error( $translate_response ) ){
                Utilities::display_admin_notice( 'It wasn\'t possible to Translate the post using the GT Api. Error:' . $response_term->get_error_message() , 'error' );
                return;
            }

            /**
             * Getting the new created and trasnalted post
             */
            $new_post = get_post( $translate_response );

            Utilities::display_admin_notice( 'New post "' . $new_post->post_title . '" created and translated successfully', 'success' );
        } );
    }

    public static function prepare_blocks_to_insert_in_post( $blocks_array, $blocks_translated ){
        $i = 0;
    
        foreach( $blocks_array as &$block ){
            $block_type = $block['blockName'];

            switch ( $block_type ) {     
                case 'acf/ps-alert-box': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['content'] ) );
                }
                    break;          
                case 'acf/ps-callout': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['text', 'cta_label'] ) );
                }
                    break;          
                case 'acf/ps-brandlogo': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['title', 'text', 'support'] ) );
                }
                    break;          
                case 'acf/ps-content-image': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['content'] ) );
                }
                    break;          
                case 'acf/ps-featured-post': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['heading'] ) );
                }
                    break;          
                case 'acf/ps-post-list': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, ['heading', 'sub_heading'] ) );
                }
                    break;          
                case 'acf/ps-team-members': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, [
                        [ 'prefix' => 'items_', 'name' => 'role' ], 
                        [ 'prefix' => 'items_', 'name' => 'manual_bio' ],
                    ] ) );
                }
                    break;          
                case 'acf/ps-topten-table': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, [
                        'short_description', 
                        'button_text',
                        [ 'prefix' => 'features_', 'name' => 'name' ], 
                        [ 'prefix' => 'pros_', 'name' => 'name' ], 
                        [ 'prefix' => 'cons_', 'name' => 'name' ], 
                    ] ) );
                }
                    break;   
                case 'acf/ps-top-vpn-table': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, [
                        [ 'prefix' => 'items_', 'name' => 'title' ], 
                        [ 'prefix' => 'items_', 'name' => 'short_description' ], 
                        [ 'prefix' => 'items_', 'name' => 'button_text' ], 
                    ] ) );
                }
                    break;         
                case 'acf/ps-vertical-cards': {
                    extract( self::write_to_acf_block( $blocks_translated, $block, $i, [
                        'heading',
                        [ 'prefix' => 'items_', 'name' => 'featured' ], 
                        [ 'prefix' => 'items_', 'name' => 'banner' ], 
                        [ 'prefix' => 'items_', 'name' => 'name' ], 
                        [ 'prefix' => 'items_', 'name' => 'title' ], 
                        [ 'prefix' => 'items_', 'name' => 'short_description' ], 
                        [ 'prefix' => 'items_', 'name' => 'button_text' ], 
                    ] ) );
                }
                    break;         
                case 'yoast/faq-block': {
                    extract( self::write_to_yoast_block( $blocks_translated, $block, $i ) );
                }
                    break;         
                default: {
                    $block['innerContent'][0] = $blocks_translated[$i]['text'] ?? '';
                }
                    break;
            }

            $i++;
        }

        return $blocks_array;
    }

    public static function write_to_yoast_block( $blocks_translated, $block, $i ) {
        foreach( $block['attrs']['questions'] as &$question  ){
            $question['jsonQuestion']   = $blocks_translated[$i]['text'] ?? '';
            $i++;

            $question['jsonAnswer']     = $blocks_translated[$i]['text'] ?? '';
            $i++;

            foreach( $question['question'] as &$simple_question ){
                if( is_string( $simple_question ) ){
                    $simple_question = $blocks_translated[$i]['text'] ?? '';
                    $i++;
                }
            }

            foreach( $question['answer'] as &$simple_answer ){
                if( is_string( $simple_answer ) ){
                    $simple_answer = $blocks_translated[$i]['text'] ?? '';
                    $i++;
                }
            }
        }

        foreach( $block['innerContent'] as &$inner_content ){
            $inner_content = $blocks_translated[$i]['text'] ?? '';
            $i++;
        }

        return [ 'i' => $i - 1, 'block' => $block ];

    }

    public static function read_from_yoast_block( $content_ready, $block ) {
        if( !isset( $block['attrs']['questions'] ) ){
            return $content_ready;
        }

        foreach( $block['attrs']['questions'] as $question ){
            $content_ready[] = $question['jsonQuestion'];
            $content_ready[] = $question['jsonAnswer'];

            foreach( $question['question'] as $simple_question ){
                if( is_string( $simple_question ) ){
                    $content_ready[] = $simple_question ?? '';
                }
            }

            foreach( $question['answer'] as $simple_answer ){
                if( is_string( $simple_answer ) ){
                    $content_ready[] = $simple_answer ?? '';
                }
            }
        }

        foreach( $block['innerContent'] as $inner_content ){
            $content_ready[] = is_string( $inner_content ) ? $inner_content : '';
        }

        return $content_ready;
    }

    private static function read_from_acf_block( $content_ready, $block, $field_names ){
        foreach( $field_names as $field ){
            if( is_array( $field ) ){
                foreach( $block['attrs']['data'] as $key => $value ){
                    $prefix = $field['prefix'];
                    $name   = $field['name'];
            
                    if( preg_match( "/\b" . $prefix . "\d+_$name/i", $key ) ){
                        $content_ready[] = $block['attrs']['data'][$key] ?? '';
                    }        
                }
            }
            else {
                $content_ready[] = $block['attrs']['data'][$field] ?? '';
            }
        }

        return $content_ready;
    }

    private static function write_to_acf_block( $blocks_translated, $block, $i, $field_names ) {
        foreach( $field_names as $field ){
            if( is_array( $field ) ){
                foreach( $block['attrs']['data'] as $key => $value ){
                    $prefix = $field['prefix'];
                    $name   = $field['name'];
            
                    if( preg_match( "/\b" . $prefix . "\d+_$name/i", $key ) ){
                        $text_trasnlated = htmlspecialchars_decode( $blocks_translated[$i]['text'] ?? '', ENT_QUOTES );
                        $block['attrs']['data'][$key] = $text_trasnlated;
                        $i++;
                    }        
                }
            }
            else {
                $block['attrs']['data'][$field] = $blocks_translated[$i]['text'] ?? '';
                $i++;

            }

        }

        return [ 'i' => $i - 1, 'block' => $block ];
    }

    private static function prepare_blocks_for_translations( $blocks ){
        $content_ready = [];

        foreach( $blocks as $block ){
            $block_type = $block['blockName'];

            switch ( $block_type ) {    
                case 'acf/ps-alert-box': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['content'] );
                }
                    break;
                case 'acf/ps-callout': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['text', 'cta_label'] );
                }
                    break;
                case 'acf/ps-brandlogo': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['title', 'text', 'support'] );
                }
                    break;
                case 'acf/ps-content-image': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['content'] );
                }
                    break;
                case 'acf/ps-featured-post': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['heading'] );
                }
                    break;
                case 'acf/ps-post-list': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, ['heading', 'sub_heading'] );
                }
                    break;
                case 'acf/ps-team-members': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, [
                        [ 'prefix' => 'items_', 'name' => 'role' ], 
                        [ 'prefix' => 'items_', 'name' => 'manual_bio' ],
                    ]  );
                }
                    break;
                case 'acf/ps-topten-table': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, [
                        'short_description', 
                        'button_text',
                        [ 'prefix' => 'features_', 'name' => 'name' ], 
                        [ 'prefix' => 'pros_', 'name' => 'name' ], 
                        [ 'prefix' => 'cons_', 'name' => 'name' ], 
                    ] );
                }
                    break;
                case 'acf/ps-top-vpn-table': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, [
                        [ 'prefix' => 'items_', 'name' => 'title' ], 
                        [ 'prefix' => 'items_', 'name' => 'short_description' ], 
                        [ 'prefix' => 'items_', 'name' => 'button_text' ], 
                    ] );
                }
                    break;
                case 'acf/ps-vertical-cards': {
                    $content_ready = self::read_from_acf_block( $content_ready, $block, [
                        'heading',
                        [ 'prefix' => 'items_', 'name' => 'featured' ], 
                        [ 'prefix' => 'items_', 'name' => 'banner' ], 
                        [ 'prefix' => 'items_', 'name' => 'name' ], 
                        [ 'prefix' => 'items_', 'name' => 'title' ], 
                        [ 'prefix' => 'items_', 'name' => 'short_description' ], 
                        [ 'prefix' => 'items_', 'name' => 'button_text' ], 
                    ] );
                }
                    break;
                case 'yoast/faq-block': {
                    $content_ready = self::read_from_yoast_block( $content_ready, $block );
                }
                    break;
                default:
                    $content_ready[] = $block['innerContent'][0] ?? '';
                    break;
            }
        }

        return $content_ready;
    }

    public static function prepare_content_for_trasnlation( $to_translate ){
        $content_ready = [];

        foreach( $to_translate as $key => $string ){
            $content_ready[] = $string;

        }

        return $content_ready;
    }

    public static function prepare_content_to_insert_in_post( $to_translate, $content_translated ){
        $i = 0;
        foreach( $to_translate as &$string ){
            $string = $content_translated[ $i ]['text'] ?? '';

            $i++;
        }

        return $to_translate;
    }

    private static function get_meta_values_from_repeater( $post_id, $to_translate, $option ) {
        $meta_key = str_replace( 'post_meta__', '', $option );
        $items_count = (int) get_post_meta( $post_id, $meta_key, true );

        for( $i = 0; $i < $items_count; $i++ ){
            $item_meta_key  = $meta_key . '_' . $i . '_item';
            $to_translate['post_meta__' . $item_meta_key] = get_post_meta( $post_id, $item_meta_key, true );
        }

        return $to_translate;
    }

    public static function translate_post( $post_id, $target_lang, $options = null ) {
        $post = get_post( $post_id );

        if( !$post ){
            return;
        }

        if( $post->post_status == 'auto-draft' ){
            return [ 'error' => 'Either "Save draft" or "Publish" the post before attemp to trasnlate it.' ];
        };

        $to_translate = [];
        foreach ( $options as $option ){
            if( strpos( $option, 'post_meta__' ) !== false ){
                if( $option == 'post_meta__summary_bullets' ){
                    $to_translate = self::get_meta_values_from_repeater( $post_id, $to_translate, $option );
                }
                else {
                    $meta_key = str_replace( 'post_meta__', '', $option );
                    $to_translate[$option] = get_post_meta( $post_id, $meta_key, true );

                }
            }
            else if( property_exists( $post, $option ) && $option != 'post_content' ){
                $to_translate[$option] = $post->{$option};
            }

        }

        if( count( $to_translate ) == 0 ){
            return [ 'error' => 'No options to translate' ];
        }
 
        $content_to_translate   = self::prepare_content_for_trasnlation( $to_translate );
        $content_translated     = self::translate_batch( $content_to_translate, $target_lang );

        if( isset( $content_translated['error'] ) ){
            return $content_translated;
        }

        $content_to_insert      = self::prepare_content_to_insert_in_post( $to_translate, $content_translated );

        /**
         * Getting the Blocks
         */
        $blocks_array           = parse_blocks( $post->post_content );
        $blocks_to_translate    = self::prepare_blocks_for_translations( $blocks_array );

        /**
         * The Google Translate API only accepts 
         * a batch trasnlation of up to 128 items per call
         */
        $blocks_translated = [];
        foreach( array_chunk( $blocks_to_translate, 125 ) as $chunk ){
            $blocks_translated = array_merge( $blocks_translated, self::translate_batch( $chunk, $target_lang ));
        }

        if( isset( $blocks_translated['error'] ) ){
            return $blocks_translated;
        }

        $blocks_to_insert           = self::prepare_blocks_to_insert_in_post( $blocks_array, $blocks_translated );
        $blocks_string_to_insert    = serialize_blocks( $blocks_to_insert );

        /**
         * Search for post meta
         */
        foreach( $content_to_insert as $key => $content ){
            if( strpos( $key, 'post_meta__' ) !== false ){
                update_post_meta( $post_id, str_replace( 'post_meta__', '', $key ), $content );
                unset( $content_to_insert[ $key ] );
            }
        }

        $content_to_insert['post_content']  = $blocks_string_to_insert;
        $content_to_insert['ID']            = $post_id;

        return wp_update_post( wp_slash( $content_to_insert ) );
    }

    public static function get_gtapi_client(){
        if( !defined( 'GT_API_KEY' ) ){
            return [
                'error'     => 'GT_API_KEY constant not defined',
            ];
        }

        if( !GT_API_KEY ){
            return [
                'error'     => 'GT_API_KEY constant is empty',
            ];
        }

        $translate_client = new TranslateClient([
            'key' => GT_API_KEY
        ]);

        return $translate_client;
    }

    public static function translate_batch( array $content = [], $target_lang = 'en', $type = 'html' ) {
        $translate_client = self::get_gtapi_client();

        if( is_array( $translate_client ) && isset( $translate_client['error'] ) ){
            return $translate_client;
        }

        try {
            return $translate_client->translateBatch( $content, [
                'target' => $target_lang,
            ]);

        } 
        catch ( \Exception $e ) {
            return [
                'error' =>  $e->getMessage(),
            ];
        }
    }

    public static function translate_string( $content = '', $target_lang = 'en', $type = 'html' ){
        $translate_client = self::get_gtapi_client();

        if( is_array( $translate_client ) && isset( $translate_client['error'] ) ){
            return $translate_client;
        }

        try {
            return $translate_client->translate( $content, [
                'target' => $target_lang,
            ]);

        } 
        catch ( \Exception $e ) {
            return [
                'error' => $e->getMessage(),
            ];

        }
    }

    public static function filter_switcher_links() {
        /**
         * If Polylang isn't active, 
         * then do not even try to add the filter.
         */
        if ( !function_exists( 'pll_current_language' ) ) {
            return;
        }

        /**
         * If is admin, then return.
         */
        if( is_admin() ){
            return;
        }

        /**
         * 
         * This filter helps the Polylang Switcher
         * to serve the proper url on the author pages.
         */
        // add_filter( 'pll_the_language_link', function( $url, $slug ) {
        //     /**
        //      * This filter is only for the authors pages.
        //      */
        //     // if ( !is_author() ) {
        //     //     return $url;
        //     // }

        //     if( get_query_var( 'ps_author' ) )

        //     /**
        //      * Get the local's author page.
        //      */
        //     $author_page_object         = get_page_by_path( 'author', OBJECT, 'page' );
        //     $author_page_tranlations    = pll_get_post_translations( $author_page_object->ID );
        //     $translated_author_page     = get_post( $author_page_tranlations[ $slug ] );

        //     $has_slug   = ( $slug == 'en' ) ? false : true;
        //     $url        = Utilities::replace_archive_slug( $url, $translated_author_page->post_name, $has_slug );

        //     return $url;
        // }, 1000000, 2 );
    }
}