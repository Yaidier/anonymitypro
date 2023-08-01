<?php

$context = Timber::get_context();

$context['author'] = new \Timber\User( get_queried_object() );
$context['posts'] = Timber::get_posts();

Timber::render( array( 'archives/authors.twig' ), $context );




