<?php

namespace ScTheme\Blocks;

class NewsCardsBlock extends AbstractBlock {
    const block_name    = 'vv-newscards';
    const title         = 'VV News Cards';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_newscards_field_group',
            'title'     => 'News Cards',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'News Cards',
                ],
                [
                    'key'       => 'vv_block_newscards_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => 'vv_block_header_show_cta_btn',
                    'name'      => 'show_cta_btn',
                    'label'     => 'Show Cta Button',
                    'type'      => 'true_false',
                    'ui'        => 1,
                    'default_value' => '1',
                ],
                [
                    'key'       => 'vv_block_newscards_btn_text',
                    'name'      => 'btn_text',
                    'label'     => 'Button Text',
                    'type'      => 'text',
                    'default_value' => 'Read More News',
                    'conditional_logic' => [
                        'field' => 'vv_block_header_show_cta_btn',
                        'operator' => '==',
                        'value' => '1',
                    ]
                ],
                [
                    'key'       => 'vv_block_newscards_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value' => '',
                    'conditional_logic' => [
                        [
                            'field' => 'vv_block_newscards_btn_text',
                            'operator' => '==',
                            'value' => '1',
                        ],
                    ]
                ],
                [
                    'key'       => 'vv_block_newscards_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'vv_block_newscards_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        [
                            'key' => 'vv_block_newscards_item_text',
                            'name' => 'text',
                            'label' => 'Text',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_newscards_item_date',
                            'name' => 'date',
                            'label' => 'Date',
                            'type' => 'text',
                        ],     
                    ]
                ],
                [
                    'key'       => 'vv_block_newscards_show_arrow_icon',
                    'name'      => 'show_arrow_icon',
                    'label'     => 'Show Arrow Icon',
                    'type'      => 'true_false',
                    'ui'        => 1,
                    'default_value' => true,
                ],
                [
                    'key'       => 'vv_block_newscards_columns',
                    'name'      => 'vv_columns',
                    'label'     => 'Number of columns',
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

    public function modifyContext($context) {
        $context['icon_type'] = $context['fields']['theme'] ?? '';

        return $context;
    }
}
