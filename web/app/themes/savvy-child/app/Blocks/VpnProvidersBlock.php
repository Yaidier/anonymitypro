<?php

namespace ScTheme\Blocks;

class VpnProvidersBlock extends AbstractBlock {
    const block_name    = 'vv-vpnproviders';
    const title         = 'VV VPN Providers';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_vpnproviders_field_group',
            'title'     => 'Vpn Providers',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Vpn Providers',
                ],
                [
                    'key'       => 'vv_block_vpnproviders_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => 'vv_block_vpnproviders_show_cta_btn',
                    'name'      => 'show_cta_btn',
                    'label'     => 'Show Cta Button',
                    'type'      => 'true_false',
                    'ui'        => 1,
                    'default_value' => '1',
                ],
                [
                    'key'       => 'vv_block_vpnproviders_btn_text',
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
                    'key'       => 'vv_block_vpnproviders_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value' => '',
                    'conditional_logic' => [
                        [
                            'field' => 'vv_block_vpnproviders_btn_text',
                            'operator' => '==',
                            'value' => '1',
                        ],
                    ]
                ], 
                [
                    'key'       => 'vv_block_vpnproviders_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'vv_block_vpnproviders_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        [
                            'key' => 'vv_block_vpnproviders_item_name',
                            'name' => 'name',
                            'label' => 'Name',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_vpnproviders_item_title',
                            'name' => 'title',
                            'label' => 'Title',
                            'type' => 'text',
                        ], 
                        [
                            'key' => 'vv_block_vpnproviders_item_decription',
                            'name' => 'description',
                            'label' => 'Description',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_vpnproviders_item_score',
                            'name' => 'score',
                            'label' => 'Score',
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
