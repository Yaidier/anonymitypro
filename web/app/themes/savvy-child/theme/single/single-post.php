<?php

use Timber\Timber;
use Timber\Post;

$context                = Timber::context();
$context['post']        = new Post();
$context['categories']  = Timber::get_terms( 'category', [
    'parent'    => 0,
    'depth'     => 1,
    'exclude'   => [1],
] );

/**
 * Get related posts.
 */
$post_categories = $context['post']->terms('category');

if ( ! empty( $post_categories ) ) {
    /**
     * Get the first category ID.
     */
    $first_cat_id = $post_categories[0]->ID;

    /**
     * Arguments for the related posts query.
     */
    $args = array(
        'category__in'          => array( $first_cat_id ),
        'post__not_in'          => array( $post->ID ),
        'posts_per_page'        => 9,
        'ignore_sticky_posts'   => 1
    );

    /**
     * The related posts query.
     * */ 
    $related_posts = Timber::get_posts( $args );

    /**
     * Add the related posts to the context.
     */
    $context['related_posts'] = $related_posts;
}

$context['dynamic_sidebar'] = Timber::get_widgets( 'savvy-post-sidebar' );

Timber::render( 'posts/post.twig', $context );
