<?php

use Timber\Timber;
use Timber\PostQuery;
use Timber\User;

/**
 * Get current user data.
 */
$author = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author'));

/**
 * Prepare the context.
 */
$context            = Timber::context();
$context['posts']   = new PostQuery();
$context['author']  = new User( $author->ID );

Timber::render( 'posts/author.twig', $context );
