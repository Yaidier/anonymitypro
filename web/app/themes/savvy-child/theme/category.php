<?php

$context                                = \Timber::context();
$timber_term                            = new \Timber\Term();
$context['term']                        = $timber_term;
$context['posts']                       = new \Timber\PostQuery();
$context['dynamic_sidebar']             = \Timber::get_widgets('ps-news-category-sidebar');
$context['subheader_title']             = $context['term']->short_description;
$context['subheader_intro']             = $context['term']->description;
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['show_affiliate_disclosure']   = false;

/**
 * If Timber Term do not have parent, then 
 * we are in the Archive page.
 */
if( !$timber_term->parent ){
    $context['hero_image']                  = '/app/themes/savvychild-child/assets/svg/ps-bg-news.svg';
    $context['hero_alt']                    = 'Streaming Era News Hero';
    $context['hide_subheader_author']       = true;
    $context['hide_subheader_date']         = true;
    $context['show_affiliate_disclosure']   = true;
}


if ($context['posts']->pagination()->current === 1 && !$context['term']->parent) {
    $context['posts_featured'] = array_slice($context['posts']->get_posts(), 0, 1);
    $context['posts_grid'] = array_slice($context['posts']->get_posts(), 1, 3);
    $context['posts_list'] = array_slice($context['posts']->get_posts(), 4);
} else {
    $context['posts_list'] = $context['posts'];
}

add_filter('wpseo_breadcrumb_links', function ( $crumbs ) use ( $timber_term ) {
    if( !$parent_category_id = $timber_term->parent ){
        $category_name      = $timber_term->name;
        $category_link      = get_category_link( $timber_term->id );

    }
    else {
        $parent_category    = get_category( $parent_category_id );
        $category_link      = get_category_link( $parent_category_id );
        $category_name      = $parent_category->name;

    }

    $crumbs[1] = [
        'text'  => $category_name,
        'url'   => $category_link,
    ];

    return $crumbs;
});

\Timber::render('archives/category.twig', $context);
