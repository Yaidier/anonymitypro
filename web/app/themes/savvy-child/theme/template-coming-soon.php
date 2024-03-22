<?php
/**
 * Template Name: Coming Soon
 * Description: A Coming Soon Template  
 * */

use Timber\Timber;
use Timber\Post;

$context = Timber::context();

$timber_post                            = new Post();
$context['template_fields']             = get_fields();
$context['post']                        = $timber_post;
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['hide_subheader_disclosure']   = true;
$context['hide_section_share']          = true;
$context['hide_section_author']         = true;
$context['hide_section_comments']       = true;
$context['hide_section_comments_form']  = true;
$context['hide_section_related_posts']  = true;

Timber::render( ['post-' . $timber_post->post_name . '.twig', 'posts/coming-soon.twig' ], $context );
