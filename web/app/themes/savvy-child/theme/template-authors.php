<?php
/**
 * Template Name: Authors
 * Description: Authors Template 
 */

use Timber\Timber;
use Timber\Post;

$context            = Timber::context();
$context['post']    = new Post();

$users = get_users([
    'number'    => -1,
    'orderby'   => 'post_count',
    'order'     => 'DESC',
    'has_published_posts' => true,
]);

$context['authors'] = array_map( function( $user ) {
    $author = [
        'name'          => $user->data->display_name,
        'first_name'    => get_user_meta( $user->ID, 'first_name', true ),
        'avatar'        => get_avatar_url( $user->ID ),
        'description'   => get_user_meta( $user->ID, 'description', true ),
        'twitter'       => get_user_meta( $user->ID, 'twitter', true ),
        'linkedin'      => get_user_meta( $user->ID, 'linkedin', true ),
        'link'          => get_author_posts_url( $user->ID ),
    ];

    return $author;
}, $users );

Timber::render( ['archives/authors.twig'], $context );
