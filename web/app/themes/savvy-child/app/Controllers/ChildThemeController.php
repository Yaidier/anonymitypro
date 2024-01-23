<?php

namespace ScTheme\Controllers;

use ScTheme\Resources\Utils;

/**
 * The Theme Controller Class
 *
 * @author Yaidier Perez
 * */

class ChildThemeController extends BaseController {
    public static function init() {
        self::add_to_timber_context();
        self::set_theme_files_directories();
        self::load_media_in_backend();
        self::load_admin_scripts();
        self::register_sidebars();
	}

    public static function register_sidebars() {
        register_sidebar([
            'name'          => 'Post Sidebar',
            'id'            => 'savvy-post-sidebar',
            'before_widget' => '<div class="savvy-post_sidebar">',
            'after_widget'  => '</div>',
        ]);

        register_sidebar([
            'name'          => 'Page Sidebar',
            'id'            => 'savvy-page-sidebar',
            'before_widget' => '<div class="savvy-page_sidebar">',
            'after_widget'  => '</div>',
        ]);
    }

    public static function load_admin_scripts() {
        add_action( 'admin_footer', function() {
            ?>
            <script>
                jQuery(document).ready( function($) {
                function ct_media_upload(button_class) {
                    var _custom_media = true,
                    _orig_send_attachment = wp.media.editor.send.attachment;
                    $('body').on('click', button_class, function(e) {
                    var button_id = '#'+$(this).attr('id');
                    var send_attachment_bkp = wp.media.editor.send.attachment;
                    var button = $(button_id);
                    _custom_media = true;
                    wp.media.editor.send.attachment = function(props, attachment){
                        if ( _custom_media ) {
                        $('#cat_featured_img_id').val(attachment.id);
                        $('#category-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
                        $('#category-image-wrapper .custom_media_image').attr('src',attachment.url).css('display','block');
                        } else {
                        return _orig_send_attachment.apply( button_id, [props, attachment] );
                        }
                        }
                    wp.media.editor.open(button);
                    return false;
                });
                }
                ct_media_upload('.ct_tax_media_button.button'); 
                $('body').on('click','.ct_tax_media_remove',function(){
                $('#cat_featured_img_id').val('');
                $('#category-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
                });
                // Thanks: http://stackoverflow.com/questions/15281995/wordpress-create-category-ajax-response
                $(document).ajaxComplete(function(event, xhr, settings) {
                var queryStringArr = settings.data.split('&');
                if( $.inArray('action=add-tag', queryStringArr) !== -1 ){
                    var xml = xhr.responseXML;
                    $response = $(xml).find('term_id').text();
                    if($response!=""){
                    // Clear the thumb image
                    $('#category-image-wrapper').html('');
                    }
                }
                });
            });
            </script>
            <?php
        } );
    }

    public static function load_media_in_backend() {
        add_action( 'admin_enqueue_scripts', function() {
            wp_enqueue_media();
        } );
    }

    public static function set_theme_files_directories() {
        $templates = [ 
            '404', 
            'archive', 
            'author', 
            'footer', 
            'header', 
            'page', 
            'search', 
            'sidebar', 
            'single',
            'frontpage',
            'category',
            'taxonomy',
            'index',
        ];

        foreach( $templates as $template ) {
            add_filter(  $template . '_template', function( $path_to_template ) use ( $template ) {
                $queried_object = get_queried_object();

                if( $path_to_template ) {
                    $path       = pathinfo( $path_to_template );
                    $template   = $path['filename'];
                }
                
                if( $template == 'frontpage' ) {
                    $template = 'page';
                }

                if( $template == 'index' ) {
                    $template = 'news';
                }

                if( $template == 'single' ) {
                    $template = 'single/single-' . $queried_object->post_type;
                }

                if( $template == 'archive' ) {
                    $template = 'archives/archive-' . $queried_object->name;
                }

                if( $template == 'taxonomy' ){
                    $post_type  = Utils::get_posttype_from_taxonomy_name( $queried_object->taxonomy );
                    $template   = 'taxonomies/taxonomy-' . $post_type;
                }

                $returned_template = get_stylesheet_directory() . '/theme/' . $template . '.php';

                return $returned_template;
            }, 1000000, 1 );
        }
    }

    public static function add_to_timber_context () {
        add_filter( 'timber/context', array( self::class, 'add_to_context' ) );
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public static function add_to_context( $context ) {
        $context['header_menu'] = new \Timber\Menu( 'header_menu' );

        if ( has_nav_menu( 'footer_menu_1' ) ) {
            $context['footer_menu_1'] = new \Timber\Menu( "footer_menu_1" );
        }

        if ( has_nav_menu( 'footer_menu_2' ) ) {
            $context['footer_menu_2'] = new \Timber\Menu( "footer_menu_2" );
        }

        if ( has_nav_menu('footer_menu_3') ) {
            $context['footer_menu_3'] = new \Timber\Menu( "footer_menu_3" );
        }

        if ( has_nav_menu('footer_menu_4') ) {
            $context['footer_menu_4'] = new \Timber\Menu( "footer_menu_4" );
        }

        if ( has_nav_menu('footer_menu_legal') ) {
            $context['footer_menu_legal'] = new \Timber\Menu( "footer_menu_legal" );
        }

        $context['home_url']            = get_home_url();
        // $context['site_logo_url']       = '/app/themes/savvy/assets/svg/ps-logo-light.svg';
        // $context['site_logo_dark_url']  = '/app/themes/savvy/assets/svg/ps-logo-dark.svg';
        $context['show_cookie_consent'] = !isset( $_COOKIE['ps_cookie_consent'] );
        $context['options']             = get_fields('options');

        $context['utils']               = new Utils();

        return $context;
    }
}