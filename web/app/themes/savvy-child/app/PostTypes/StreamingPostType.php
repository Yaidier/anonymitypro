<?php

namespace ScTheme\PostTypes;

use ScTheme\Taxonomies\StreamingCategoryTaxonomy;
use ScTheme\Resources\Utils;

class StreamingPostType extends AbstractPostType {
    const post_type_name            = 'sc-streaming';
    const singular_name             = 'Streaming';
    const plural_name               = 'Streaming';
    const menu_icon                 = 'dashicons-welcome-view-site';
    const default_subheader_title   = 'Streaming';
    const default_subheader_intro   = 'You cannot access everything online freely. Everyone, including streamers, gamers, sports lovers, students, employees, and ex-pats, faces censorship and geoblocking today. Learn how to gain internet freedom here.';
    const supports                  = ['title', 'editor', 'thumbnail', 'author', 'comments'];
    const taxonomies                = null;
    const is_public                 = true;
    const is_hierarchical           = false;
    const is_excluded_from_search   = false;
    const is_publicly_queryable     = true;
    const rewrite                   = [
        'slug'          => '%streaming_category%',
        'with_front'    => false,
    ];

    public static function get_category_taxonomy_slug() {
        return StreamingCategoryTaxonomy::get_slug(); 
    }

    public function getTaxonomies() {
        return [ StreamingCategoryTaxonomy::getTaxonomyNameStatic(), 'post_tag' ];
    }

    public function afterRegister() {
        add_filter( 'post_type_link',   [ $this, 'configurePermalink' ], 1, 2 );
        add_action( 'edit_terms',       [ $this, 'onEditTerm' ], 10, 2 );

        $this->registerArchiveSettings();
        $this->registerFields();

        flush_rewrite_rules();
    }

    public function configurePermalink($post_link, $post) {
        if ( !is_object( $post ) ) {
            return $post_link;
        }

        if ( $post->post_type !== self::post_type_name ) {
            return $post_link;
        }

        $context            = \Timber::context();
        $context['utils']   = $context['utils'] ?? new Utils();
        $primary_category   = $context['utils']->getPrimaryCategory( 
            $post->ID,
            StreamingCategoryTaxonomy::getTaxonomyNameStatic(),
        );

        if ( !$primary_category ) {
            return $post_link;
        }

        return self::modify_permalink( $post_link, $post, $primary_category, self::rewrite['slug'] );
    }

    public function onEditTerm( $term_id, $taxonomy ) {
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'   => 'sc_streaming_field_group',
            'title' => 'Additional Fields',
            'fields' => [
                [
                    'key'   => 'sc_streaming_official_link',
                    'name'  => 'official_link',
                    'label' => 'Official Link',
                    'type'  => 'url',
                ],
                [
                    'key'   => 'sc_streaming_affiliate_link',
                    'name'  => 'affiliate_link',
                    'label' => 'Affiliate Link',
                    'type'  => 'url',
                ],
            ],
            'location' => [
                [
                    [
                        'param'     => 'post_type',
                        'operator'  => '==',
                        'value'     => self::post_type_name,
                    ],
                ],
            ],
        ]);
        
        $this->register_tldr_fields( self::post_type_name, 14 );
        $this->register_facts_checked_fields( self::post_type_name, 15 );
    }
}
