<?php

use Timber\Timber;
use Timber\Term;
use Timber\PostQuery;

$context                                = Timber::context();
$timber_term                            = new Term();
$context['term']                        = $timber_term;
$context['posts']                       = new PostQuery();
$context['dynamic_sidebar']             = Timber::get_widgets('ps-news-category-sidebar');

Timber::render('archives/category.twig', $context);
