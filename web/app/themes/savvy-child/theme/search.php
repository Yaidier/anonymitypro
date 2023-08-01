<?php

$context = \Timber::context();

$context                                = \Timber::context();
$context['posts']                       = new \Timber\PostQuery();
$context['subheader_title']             = 'Search results for "' . get_search_query() . '"';
$context['hero_image']                  = '/app/themes/savvychild-child/assets/svg/ps-bg-search.svg';
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['show_affiliate_disclosure']   = false;

add_filter('wpseo_breadcrumb_links', function ( $crumbs ) {
    $crumbs[1] = [
        'text' => 'Search',
        'url' => null,
    ];
    return $crumbs;
});

\Timber::render( 'archives/archive.twig', $context );
