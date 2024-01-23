<?php

namespace ScTheme\Blocks;

use Timber\Post;

class ArticlesCardsBlock extends AbstractBlock {
    const block_name    = 'vv-articlescards';
    const title         = 'VV Articles Cards';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter( 'vv_block_render_context__' . self::block_name, [$this, 'modifyContext'] );
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => self::block_name . '_field_group',
            'title'     => 'Articles Cards',
            'fields'    => [
                [
                    'key'       => self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Articles Cards',
                ],
                [
                    'key'       => self::block_name . '_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => self::block_name . '_posts',
                    'name'      => 'posts',
                    'label'     => 'Posts',
                    'type'      => 'post_object',
                    'multiple'  => 1,
                    'layout'    => 'block',
                    'return_format' => 'id',
                ],
            ],
            'location' => [
                [
                    [
                        'param'     => 'block',
                        'operator'  => '==',
                        'value'     => 'acf/' . self::block_name,
                    ],
                ],
            ],
        ]);
    }

    public function modifyContext( $context ) {
        /**
         * Get the post IDs from the context.
         */
        $post_ids = $context['fields']['posts'] ?? [];

        if( empty( $post_ids ) ) {
            return $context;
        }

        $context['fields']['posts'] = array_map( function ( $post_id ) {
            return new Post( $post_id );
        }, $post_ids);

        return $context;
    }
}
