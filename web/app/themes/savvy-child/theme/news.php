<?php
/**
 * Template Name: News
 * Description: The News Template  */

$context                                = \Timber::context();
$context['post']                        = new \Timber\Post();
$context['posts']                       = new \Timber\PostQuery();
$context['dynamic_sidebar']             = \Timber::get_widgets('ps-news-category-sidebar');
$context['subheader_title']             = $context['post']->post_title;
$context['subheader_intro']             = $context['post']->intro;
$context['hero_image']                  = '/app/themes/savvychild-child/assets/svg/ps-bg-news.svg';
$context['hero_alt']                    = 'Streaming Era News Hero';
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;

$posts_page = $context['post'];
add_filter( 'wpseo_breadcrumb_links', function ($crumbs) use ( $posts_page ) {
    $crumbs[1] = [
        'text'  => $posts_page->post_title,
        'url'   => get_permalink( $posts_page->ID ),
    ];

    return $crumbs;
});

if ($context['posts']->pagination()->current === 1) {
    $context['posts_featured']  = array_slice( $context['posts']->get_posts(), 0, 1 );
    $context['posts_grid']      = array_slice( $context['posts']->get_posts(), 1, 3 );
    $context['posts_list']      = array_slice( $context['posts']->get_posts(), 4 );

} else {
    $context['posts_list'] = $context['posts'];
}

\Timber::render( ['archives/index.twig'], $context );