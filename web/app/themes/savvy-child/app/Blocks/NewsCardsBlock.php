<?php

namespace ScTheme\Blocks;

use Timber\Post;

class NewsCardsBlock extends AbstractBlock {
    const block_name    = 'vv-newscards';
    const title         = 'VV News Cards';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter( 'vv_block_render_context__' . self::block_name, [$this, 'modifyContext'] );
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => self::block_name . '_field_group',
            'title'     => 'News Cards',
            'fields'    => [
                [
                    'key'       => self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'News Cards',
                ],
                [
                    'key'       => self::block_name . '_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => self::block_name . '_show_btn',
                    'name'      => 'show_btn',
                    'label'     => 'Show Button',
                    'type'      => 'true_false',
                    'ui'        => 1,
                    'default_value' => '1',
                ],
                [
                    'key'       => self::block_name . '_btn_text',
                    'name'      => 'btn_text',
                    'label'     => 'Button Text',
                    'type'      => 'text',
                    'default_value'     => 'Read More News',
                    'conditional_logic' => [
                        [
                            'field'     => self::block_name . '_show_btn',
                            'operator'  => '==',
                            'value'     => '1',
                        ]
                    ]
                ],
                [
                    'key'       => self::block_name . '_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value'     => '',
                    'conditional_logic' => [
                        [
                            'field'     => self::block_name . '_show_btn',
                            'operator'  => '==',
                            'value'     => '1',
                        ]
                    ]
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
                [
                    'key'       => self::block_name . '_columns',
                    'name'      => 'columns',
                    'label'     => 'Columns Number',
                    'type'      => 'number',
                    'min'       => 1,
                    'max'       => 4,
                    'default_value' => 4,
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
