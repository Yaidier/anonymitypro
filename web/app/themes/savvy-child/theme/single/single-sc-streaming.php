<?php

namespace ScTheme;

use ScTheme\Taxonomies\StreamingCategoryTaxonomy;
use SavvyTheme\Resources\Utilities;
use Timber\Timber;

Utilities::instance()->add_content_to_trim( 'intro', 70, '...' );

$tanoxnomy_name = StreamingCategoryTaxonomy::getTaxonomyNameStatic();
$context        = Utilities::instance()->prepare_single_post_type( $tanoxnomy_name );

$context['dynamic_sidebar']             = Timber::get_widgets('ps-geoblocking-sidebar');
$context['related_posts_heading']       = 'Related Readings:';
$context['show_affiliate_disclosure']   = true;
$context['show_estimated_time']         = true;

do_action( 'timber_before_render', $context );
Timber::render( 'posts/pspt-single.twig' , $context);
