<?php

namespace ScTheme\Blocks;

class ArticlesCardsBlock extends AbstractBlock {
    const block_name    = 'vv-articlescards';
    const title         = 'VV Articles Cards';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_articlescards_field_group',
            'title'     => 'Articles Cards',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Articles Cards',
                ],
                [
                    'key'       => 'vv_block_articlescards_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => 'vv_block_articlescards_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'vv_block_articlescards_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        [
                            'key' => 'vv_block_articlescards_item_text',
                            'name' => 'text',
                            'label' => 'Text',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_articlescards_item_description',
                            'name' => 'description',
                            'label' => 'Description',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_articlescards_item_date',
                            'name' => 'date',
                            'label' => 'Date',
                            'type' => 'text',
                        ],   
                    ]
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
