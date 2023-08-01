<?php

add_filter( 'wpseo_breadcrumb_links', function ( $crumbs ) {
    global $post;

    $crumbs[1] = [
        'text'  => $post->post_title,
        'url'   => '',
    ];

  return $crumbs;
});

$context = \Timber::context();

$timber_post                = new \Timber\Post();
$context['post']            = $timber_post;
$context['dynamic_sidebar'] = \Timber::get_widgets('ps-page-sidebar');

$context['hide_subheader_author'] = true;
$context['hide_subheader_date'] = true;
$context['hide_section_share'] = true;
$context['hide_section_author'] = true;
$context['hide_section_comments'] = true;
$context['hide_section_comments_form'] = true;
$context['hide_section_related_posts'] = true;

\Timber::render(['posts/page.twig'], $context);
