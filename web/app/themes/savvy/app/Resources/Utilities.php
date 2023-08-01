<?php

namespace SavvyTheme\Resources;

use SavvyTheme\Resources\Utils;
use SavvyTheme\Controllers\StructuredDataController;

class Utilities {

    public static $instance = null;
    static $filters_added   = [];
    static $conten_to_trim  = [];

    public static function instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public static function get_current_language(){
        return function_exists( 'pll_current_language' ) ? \pll_current_language() : 'en';
    }

    public static function set_article_score_data( int $post_id = null, int $score_value = 0 ) {
        global $post;

        $post_id    = $post_id ?? $post->ID;
        $post_type  = $post->post_type ?? '';

        if( !$post_id ){
            return [];
        }

        $article_score = get_post_meta( $post_id, 'ps_article_score', true );

        /**
         * If article_score isn't been used before, then initialize it.
         */
        if( !$article_score ) {
            $article_score = self::get_initial_article_score_values();
            $article_score = apply_filters( 'savvy_article_score', $article_score, $post_type, $post_id );
            $article_score = self::calculate_article_score_values( $article_score, $score_value );

            set_transient( 'article_score_' . $post_id, $article_score, 120 );
            update_post_meta( $post_id, 'ps_article_score', $article_score );

            return $article_score;
        }

        $article_score = self::calculate_article_score_values( $article_score, $score_value );

        /**
         * Update Post Meta
         */
        update_post_meta( $post_id, 'ps_article_score', $article_score );

        /**
         * If transient exists then update post meta with new calcualted value, but
         * return the value stored on transient.
         * 
         * If transient do not exisit or it has expired, then update the new calculated value
         * to transient and post meta and return it.
         */
        if( $article_score_transient = get_transient( 'article_score_' . $post_id ) ){
            $article_score = $article_score_transient;
        }
        else {
            set_transient( 'article_score_' . $post_id, $article_score, 60 * MINUTE_IN_SECONDS );
            do_action( 'savvy_article_score_transient_expired', $post );
        }
        
        return $article_score;
    }

    public static function calculate_article_score_values( array $article_score, int $vote_value = 0 ){
        /**
         * Adding the new vote
        */
        if( array_key_exists( 'value_' . $vote_value, $article_score ) ){
            $article_score['value_' . $vote_value] = ((int) $article_score['value_' . $vote_value]) + 1;
        }

        /**
         * Getting 'total' and 'helpful' amunt of votes
         */
        $total      = 0;
        $helpful    = 0;
        foreach( $article_score as $key => $score ){
            if( strpos( $key, 'value_' ) !== false ){
                $total = $total + (int) $score;

            }

            if( $key == 'value_3' || $key == 'value_4' || $key == 'value_5' ){
                $helpful = $helpful +  $score;
            }
        }

         /**
         * Calculate percentage of helpful votes
         */
        $helpful_percentage             = round(((int) $helpful / (int) $total) * 100);
        $helpful_percentage_base_ten    = $helpful_percentage / 10;
        $stars_array                    = self::get_stars_from_rating( $helpful_percentage_base_ten );
        $article_score['helpful_per']   = round( $helpful_percentage );
        $article_score['total']         = $total;
        $article_score['helpful']       = $helpful;
        $article_score['stars']         = $stars_array;

        return $article_score;
    }

    public static function get_stars_from_rating($rating) {
        $rating         = (float) $rating;
        $star_rating    = $rating / 2;
        $floor          = floor( $star_rating );
        $ceil           = ceil( $star_rating );
        $half_stars     = $ceil - $floor;
        $empty_stars    = 5 - ( $floor + $half_stars );

        return [
            'full_stars'    => $floor,
            'half_stars'    => $half_stars,
            'empty_stars'   => $empty_stars,
        ];
    }

    public static function get_initial_review_score_values( $post_id ) {
        $review_rating      = get_post_meta( $post_id, 'rating', true );
        $review_rating      = ( (float) $review_rating ) / 10;
        $total_votes        = rand( 100, 200 );
        $helpful_votes      = round( $total_votes * $review_rating );
        $unhelpful_votes    = $total_votes - $helpful_votes;

        $initial_values = [ 
            'value_1' => $unhelpful_votes, 
            'value_2' => 0, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => $helpful_votes, 
        ];

        return $initial_values;
    }

    public static function get_initial_article_score_values(){
        $initial_values = [];
        $random_value   = rand( 0, 4 );

        /**
         * Initial value 98%
         */
        $initial_values[] = [ 
            'value_1' => 1, 
            'value_2' => 0, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => 39, 
        ];

        /**
         * Initial value 96%
         */
        $initial_values[] = [ 
            'value_1' => 0, 
            'value_2' => 1, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => 27, 
        ];

        /**
         * Initial value 97%
         */
        $initial_values[] = [ 
            'value_1' => 1, 
            'value_2' => 0, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => 28, 
        ];

        /**
         * Initial value 95%
         */
        $initial_values[] = [ 
            'value_1' => 2, 
            'value_2' => 0, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => 35, 
        ];

        /**
         * Initial value 93%
         */
        $initial_values[] = [ 
            'value_1' => 1, 
            'value_2' => 0, 
            'value_3' => 0, 
            'value_4' => 0, 
            'value_5' => 14, 
        ];

        return $initial_values[$random_value];
    }

    static public function converts_facts_checked_to_reviewedby( array $fc_raw_data, array $fc_data = null ) {
        if( !isset( $fc_data ) ) {
            $fc_data = [
                'name'              => 'facts_checked',
                'status'            => 'success',
                'missing_fields'    => [],
                'content'           => [],
            ];
        }

        foreach( $fc_raw_data as $fc => $value ){
            switch ( $fc ) {
                case 'fc_author_name':
                    $info = 'name';
                    break;
                case 'fc_avatar_url':
                    $info = 'image_url';
                    break;
                case 'fc_author_link':
                    $info = 'url';
                    break;
                case 'fc_author_description':
                    $info = 'description';
                    break;
                case 'fc_author_job_title':
                    $info = 'jobTitle';
                    break;
                default:
                    $info = $fc;
                    break;
            }

            if( $value ){
                $fc_data['content'][$info] = $value;
            }
            else {
                $fc_data['missing_fields'][] = $info;
            }
        }

        return $fc_data;
    }

    public static function ps_admin_notice( string $status = 'success', string $heading = 'Ps Admin Notice', string $message = '', bool $is_autodismissible = true ) {
        /**
         * If there is no message, then
         * it does no make sense to display
         * the admin notice banner.
         */
        if( !$message ){
            return;
        }

        /**
         * Creating an array to send to the hook.
         */
        $auto_dismissible   = ( $is_autodismissible == true ) ? 'auto_dismissible' : '';
        $status             = 'ps-admin_notice__' . $status;


        /**
         * Status is set as placeholder, 
         * we are only showing the Ps Admin Notice banner
         * if there is a actual error, not on suceess.
         */
        ob_start();
        ?>
            <div class="ps-admin_notice <?php echo esc_attr( $auto_dismissible ); ?> ">
                <div class="ps-admin_notice_head">
                    <h2 class="ps-admin_notice_head_title <?php echo esc_attr( $status ); ?>" ><?php echo $heading; ?></h2>
                    <span class="ps-admin_notice_close dashicons dashicons-no-alt"></span>
                </div>
                <div class="ps-admin_notice_body">
                    <p><?php echo $message; ?></p>
                </div>
            </div>
        <?php
        $output = ob_get_clean();

        return $output;
    }

    public static function display_admin_notice( string $message = '', string $type = 'info', bool $is_dimissible = true ) {
        $is_dimissible  = ( $is_dimissible ) ? 'is-dismissible' : '';
        $type           = 'notice-' . $type;
        $args           = compact( 'type', 'message', 'is_dimissible' );

        add_action( 'admin_notices', function() use ( $args ) {
            extract( $args );

            echo    '<div class="notice ' . $type . ' ' . $is_dimissible . '">
                        <p>' . $message . '</p>
                    </div>'; 
        } );
    }

    public static function set_title_and_intro_archive( $context ){       
        if ( !function_exists( 'pll_current_language' ) ) {
            $lang_slug = '';

        }
        else {            
            $current_lang = pll_current_language();
            
            if( $current_lang != 'en' ){
                $lang_slug = '_' . $current_lang;

            }
            else {
                $lang_slug = '';

            }
        }

        $post_type                  = get_post_type();
        $context['subheader_title'] = get_field( $post_type . '_archive_title' . $lang_slug, 'option' ) ?? '';
        $context['subheader_intro'] = get_field( $post_type . '_archive_intro' . $lang_slug, 'option' ) ?? '';

        return $context;
    }

    public function prepare_content_for_lrc( $content ) {
        $dom = new \DomDocument; 

        /**
         * HTML5 entities (<figure> and <figcaption>) aren't 
         * recognized by the old DOMDocument parser of PHP.
         * So we need to silence the Warnings while using PHP7
         */
        libxml_use_internal_errors(true);
        $dom->loadHTML( $content ); 
        libxml_clear_errors();

        $dom->preserveWhiteSpace = false; 
        $dom->formatOutput = true; 

        $wrapper    = $dom->getElementById('ps-lrc_last_sections'); 
        $children   = $wrapper->childNodes;

        $i              = 0;
        $lrc_last_sections = '';
        foreach( $children as $child ){
            $lrc_last_sections .= $wrapper->ownerDocument->saveHTML( $child );

            $i++;
        }

        $start_pos  = strpos( $content, '<!--{{ldl_last_sections}}' );
        $end_pos    = strpos( $content, '{{ldl_last_sections}}-->' );
        $length     = $end_pos - $start_pos + 24;

        $output_clean = substr_replace( $content, '', $start_pos, $length );

        $response = [
            'output_clean' => $output_clean,
            'lrc_last_sections' => $lrc_last_sections,
        ];

        return $response;
    }

    public function prepare_content_for_ldl( $content, $split = 20 ) {
        $output         = '';
        $ldl_content    = '';
        $content        = '<div id="ps_id_selector">' . $content . '</div>';

        /**
         * Create HTML DOM.
         */
        include_once( SAVVY_THEME_DIR . '/app/Resources/HtmlDomParser.php');
        $dom = file_get_html( $content );

        /**
         * Select the wrapper.
         */
        $wrapper = $dom->getElementById('ps_id_selector');

        /**
         * Get the wrappers childrens.
         */
        $childrens = $wrapper->children;

        /**
         * Iterate over the childrens.
         */
        for( $i = 0; $i < count( $childrens ); $i++ ){
            if( $i < $split ) {
                $output .= $childrens[$i]->outertext;
            }
            else {
                $ldl_content .= $childrens[$i]->outertext;
            }
        }

        /**
         * Clean up the mermory.
         */
        $dom->clear();
        unset( $dom );

        /**
         * Removing html comments from the LDL content.
         */
        $ldl_content = self::remove_html_comments( $ldl_content );

        /**
         * Wrap the ldl into a node, so we can select it later
         * with out js app and remove the comments.
         */
        $ldl_content = '<div id="ps-late_dom_load"><!-- {{ldl}}' . $ldl_content . '{{ldl}} --></div>';

        /**
         * Concatenate the non-ldl content with the ldl content.
         */
        $output = $output . $ldl_content;

        return $output;
    }

    public static function flush_all_cache_files() {
        $cache_dir = $_SERVER['DOCUMENT_ROOT'] . '/app/cache/data';
                
        if ( is_dir( $cache_dir ) ) { 
            self::remove_directory_recursively( $cache_dir );
        } 
    }

    public static function remove_directory_recursively( $path ) {
        $files = glob( $path . '/*' );
        foreach ( $files as $file ) {
            is_dir( $file ) ? self::remove_directory_recursively( $file ) : unlink( $file );
        }

        rmdir( $path );
        return;
    }

    /**
     * Remove unwanted HTML comments
     */ 
    private static function remove_html_comments( $content = '' ) {
        return preg_replace( '/<!--(.|\s)*?-->/', '', $content );
    }

    public function add_ids_to_headings($heading_tags, $content) {
        $content = preg_replace_callback(
            '/(\<h[2-3](.*?))\>(.*)(<\/h[2-3]>)/i',
            function ($matches) {
                if (!stripos($matches[0], 'id=')) {
                    $matches[0] =
                        $matches[1] . $matches[2] . ' id="' . sanitize_title($matches[3]) . '">' . $matches[3] . $matches[4];
                }

                return $matches[0];
            },
            
            $content
        );

        return $content;
    }

    public function add_content_to_trim( $value, $chars_count, $more = '' ) {
        array_push( self::$conten_to_trim, [
            'value'         => $value,
            'chars_count'   => $chars_count,
            'more'          => $more,
        ] );

        /**
         * Ensure to add the filter just once...
         */
        if ( !in_array( 'timber_post_getter_get_posts', self::$filters_added ) ) {
            self::trim_text_on_timber_post_getter_get_posts();
        }
    }

    public static function trim_text_on_timber_post_getter_get_posts() {
        add_filter( 'timber_post_getter_get_posts', function ( $posts ) {
            foreach ( $posts as &$post ) {
                foreach ( self::$conten_to_trim as $content ) {
                    $original_value = $post->{$content['value']};
                    $trimmed_value  = substr( $original_value, 0, $content['chars_count'] );

                    if ( strlen( $original_value ) > strlen( $trimmed_value ) ) {
                        $trimmed_value .= $content['more'];
                    }

                    $post->{$content['value']} = $trimmed_value;
                }
            }

            return $posts;
        } );

        array_push( self::$filters_added, 'timber_post_getter_get_posts' );
    }

    public static function get_facts_checked( $post_id ){
        $fc = [];

        if ( $fc_author_id = get_field( 'factscheck_select_author', $post_id ) ) {
            $user_data              = get_userdata( $fc_author_id );
            $fc_author_name         = $user_data->data->display_name;
            $fc_avatar_url          = get_avatar_url( $fc_author_id, ['size' => 120] );
            $fc_author_link         = get_author_posts_url( $fc_author_id );
            $fc_author_description  = get_the_author_meta( 'user_description', $fc_author_id ) ?? '';
            $fc_author_position     = get_user_meta( (int) $fc_author_id, 'wpseo_user_schema', true )['jobTitle'] ?? false;

        } else {
            $fc_author_name         = get_field( 'factscheck_author', $post_id );
            $fc_avatar              = get_field( 'factscheck_avatar', $post_id );
            $fc_avatar_url          = wp_get_attachment_url( $fc_avatar['ID'] ?? false );
            $fc_author_link         = get_field( 'factscheck_url', $post_id ); 
            $fc_author_description  = get_field( 'factscheck_desc', $post_id ); 
            $fc_author_position     = get_field( 'factscheck_pos', $post_id ); 

        }

        if ( $fc_author_name && $fc_avatar_url ) {
            $fc['fc_author_name']           = $fc_author_name;
            $fc['fc_avatar_url']            = $fc_avatar_url;
            $fc['fc_author_link']           = $fc_author_link ?? '';
            $fc['fc_author_description']    = $fc_author_description ?? '';
            $fc['fc_author_job_title']      = $fc_author_position ?? '';
            
        }

        return $fc;
    }

    public static function get_disclosure_local_version( $context ) {

        /**
         * Set the proper Disclousure Content
         */
        if( function_exists( 'pll_current_language' ) ) {
            $current_lang           = pll_current_language();
            $defualt_lang_content   = $context['options']['affiliate_disclosure'] ?? '';

            if( $defualt_lang_content ){
                $context['options']['affiliate_disclosure'] = $context['options']['affiliate_disclosure__' . $current_lang] ?? $defualt_lang_content;
            }
        }

        return $context;
    }

    public static function replace_archive_slug( $url, $slug, $has_lang_slug = false ){
        /**
         * If there is no url or not slug then return.
         */
        if( !$slug || !$url ){
            return $url;
        }

        /**
         * Parse the url and set the offset value. 
         */
        $parsed_url = parse_url( $url );
        $offset     = $has_lang_slug ? 2 : 1;

        /**
         * Splith the path into segements.
         */
        $url_segments = explode( '/', $parsed_url['path'] ); 

        /**
         * If target segment does not exist, then return.
         */
        if( !isset( $url_segments[$offset] ) ){
            return $url;
        }
        
        $url_segments[$offset]  = $slug;
        $url_path               = implode( '/', $url_segments );
        $new_url                = $parsed_url['scheme'] . '://' . $parsed_url['host'] . $url_path;

        return $new_url;
    }

    public static function prepare_single_post_type( $tanoxnomy_name = null ) {
        /**
         * Setting generic values shared
         * across all single post types
         */

        /**
         * Timber Context
         */
        $context            = \Timber::context();
        $context['post']    = new \Timber\Post();
        
        /**
         * Get post attributes
         */
        $post_id        = $context['post']->ID;
        $post_type      = $context['post']->post_type;
        $post_content   = $context['post']->post_content;
        
        /**
         * LDL Filter
         */
        $context['post']->post_content = apply_filters( 'ldl_content', $post_content );
        
        /**
         * Facts Checked
         */
        $facts_checked  = self::get_facts_checked( $post_id  );
        $context        = array_merge( $context, $facts_checked );

        /**
         * Current Language
         */
        $current_lang = self::get_current_language();
        
        /**
         * Setting Realted Posts
         * 
         * Important! Maybe improve this function
         */
        $primary_category = $context['utils']->getPrimaryCategory( $post_id , null, $post_type );

        if( $tanoxnomy_name ){
            $context['related_posts']   = \Timber::get_posts( [
                'post_type'         => $post_type,
                'posts_per_page'    => 6,
                'post__not_in'      => [$post_id],
                'tax_query'             => [
                    'taxonomy'      => $tanoxnomy_name,
                    'field'         => 'term_id',
                    'operator'      => 'IN',
                    'terms'         => [$primary_category->term_id],
                ],
            ] );
        }

        /**
         * Get the proper language for disclosure
         */
        $context = self::get_disclosure_local_version( $context );

        /**
         * Get Popup Information
         */
        $show_popup = get_field( $post_type . '_popup_show_' . $current_lang, 'option' ) ?? false;
        if( $show_popup ){
            $popup_template             = get_field( $post_type . '_popup_theme_' . $current_lang, 'option' ) ?? 'nordvpn';
            $context['include_popup']   = $popup_template . '.twig';

            if( !( $context['load_popup_from_lrc'] ?? false ) ){
                $context['popup_content'] = Utilities::get_popup_content( $post_type, $current_lang );
            }
        }

        return $context;
    }

    public static function get_popup_content( $post_type, $current_lang = 'en' ){
        $output = [];
        $fields = [
            'pre_title',
            'title',
            'banner',
            'items',
            'btn_text',
            'btn_url',
            'cta_disclosure',
            'image',
        ];

        foreach( $fields as $field ){
            $output[$field] = get_field( $post_type . '_popup_' . $field . '_' . $current_lang, 'option' ) ?? '';
        }

        return $output;
    }

    public static function get_posttype_from_taxonomy_name( $taxonomy_name ){
        $post_type = str_replace( 'ps-', 'pspt-', $taxonomy_name );
        return str_replace( '-cat', '', $post_type );
    }

    public static function get_languages_list_for_regex() {
        /**
         * If polylang not present, then just return empty,
         * as the default language is Enlgish, and it has 
         * no slug on the url.
         */
        if( !function_exists( 'pll_languages_list' ) ){
            return '';
        }

        /**
         * Get set languages in site
         */
        $languages = pll_languages_list();

        /**
         * Remove the default language (english)
         */
        unset( $languages[0] );

        /**
         * Create languages string with "|" as separator 
         */
        $languages_string = implode( '|', $languages );

        return $languages_string;
    }
}
