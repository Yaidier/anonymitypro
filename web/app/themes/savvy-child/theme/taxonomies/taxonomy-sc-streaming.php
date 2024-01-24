<?php

namespace ScTheme;

use Timber\Timber;
use Timber\Team;
use Timber\Term;
use Timber\PostQuery;
use SavvyTheme\Resources\Utilities;

if ( isset( $_GET['month'] ) ) {
    $m      = explode('/', $_GET['month']);
    $year   = $m[0];
    $month  = $m[1];
    $args   = array(
        'posts_per_page'    => -1,
        'post_type'         => 'sc-geoblocking',
        'date_query'        => array(
            array(
                'after'         => $year . '-' . $month . '-01',
                'before'        => $year . '-' . $month . '-28',
                'inclusive'     => true,
            ),
        ),
    );
}

$context                                = Timber::context();
$context['term']                        = new Term();
$context['posts']                       = isset( $args ) ? new PostQuery( $args ) : new PostQuery();
$context['dynamic_sidebar']             = Timber::get_widgets('ps-geoblockings-sidebar');
$context['subheader_title']             = $context['term']->short_description;
$context['subheader_intro']             = $context['term']->description;
$context['hide_subheader_author']       = true;
$context['hide_subheader_date']         = true;
$context['show_affiliate_disclosure']   = false;

add_filter( 'wpseo_breadcrumb_links', [ Utilities::class, 'adjust_yoast_breadcrumbs_for_term_pages' ]);

Timber::render( 'archives/archive.twig', $context );
