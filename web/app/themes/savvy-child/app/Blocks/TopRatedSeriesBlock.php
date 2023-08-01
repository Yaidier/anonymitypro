<?php

namespace ScTheme\Blocks;

class TopRatedSeriesBlock extends AbstractBlock {
    const block_name    = 'vv-topratedseries';
    const title         = 'SE topratedseries';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('se_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'se_block_topratedseries_field_group',
            'title'     => 'topratedseries',
            'fields'    => [
                [
                    'key'       => 'se_block_' . self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Top Rated Series',
                ],
                [
                    'key'       => 'se_block_topratedseries_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => 'se_block_topratedseries_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'se_block_topratedseries_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        
                        [
                            'key' => 'se_block_topratedseries_item_title',
                            'name' => 'title',
                            'label' => 'Title',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'se_block_topratedseries_item_text',
                            'name' => 'text',
                            'label' => 'Text',
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
