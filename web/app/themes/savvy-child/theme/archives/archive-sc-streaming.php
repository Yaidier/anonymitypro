<?php

namespace ScTheme;
use SavvyTheme\Resources\Utilities;

$context                                = \Timber::context();
$context['posts']                       = new \Timber\PostQuery();
$context['dynamic_sidebar']             = \Timber::get_widgets('ps-geoblockings-hub-sidebar');
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['show_affiliate_disclosure']   = false;

/**
 * Setting the context with the title and itro for the right language
 */
$context = Utilities::set_title_and_intro_archive( $context );

add_filter( 'wpseo_breadcrumb_links', function ( $crumbs ) {
    global $post;
    
    $post_type              = get_post_type( $post->ID );
    $post_type_object       = get_post_type_object( $post_type );
    $post_type_archive_link = get_post_type_archive_link( $post_type );

    if ( function_exists( 'pll_current_language' ) ) {
        $current_lang           = pll_current_language();
        $custom_lang_bc_name    = get_field( $post_type  . '_archive_slug_breadcrumbs_' . $current_lang, 'option' );
    }

    $breadcrumb_name = $custom_lang_bc_name ?? $post_type_object->label;

    $crumbs[1] = [
        'text'  => $breadcrumb_name,
        'url'   => $post_type_archive_link,
    ];

  return $crumbs;
});

\Timber::render( 'archives/archive.twig', $context );
  