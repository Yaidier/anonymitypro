<?php

namespace ScTheme\Blocks;

class VpnOverviewBlock extends AbstractBlock {
    const block_name    = 'vv-vpnoverview';
    const title         = 'VV Vpn Overview';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_overview_field_group',
            'title'     => 'Vpn Overview',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Overview',
                ],
                [
                    'key'       => 'vv_block_overview_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => '',
                ],
                [
                    'key'       => 'vv_block_overview_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value' => '',
                ],   
                [
                    'key'       => 'vv_block_overview_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'vv_block_overview_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        [
                            'key' => 'vv_block_overview_item_name',
                            'name' => 'name',
                            'label' => 'Name',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_overview_item_position',
                            'name' => 'position',
                            'label' => 'Position',
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
