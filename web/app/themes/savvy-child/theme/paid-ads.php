<?php
/**
 * Template Name: Paid Ads Page
 * Description: The Paid Ads Page Origial Version */

$context = \Timber::context();

$current_date = get_the_date( 'l F j, Y' );

$timber_post                            = new \Timber\Post();
$context['template_fields']             = get_fields();
$context['post']                        = $timber_post;
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['show_affiliate_disclosure']   = false;
$context['hide_section_share']          = true;
$context['hide_section_author']         = true;
$context['hide_section_comments']       = true;
$context['hide_section_comments_form']  = true;
$context['hide_section_related_posts']  = true;

\Timber::render(['post-' . $timber_post->post_name . '.twig', 'posts/paid-ads.twig'], $context);