<?php

namespace ScTheme\Blocks;

class VpnProvidersBlock extends AbstractBlock {
    const block_name    = 'vv-vpnproviders';
    const title         = 'VV VPN Providers';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter( 'vv_block_render_context__' . self::block_name, [$this, 'modifyContext'] );
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => self::block_name . '_field_group',
            'title'     => 'Vpn Providers',
            'fields'    => [
                [
                    'key'       => self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Vpn Providers',
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
                    'name'      => 'show_cta_btn',
                    'label'     => 'Show Cta Button',
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
                            'value'     => '1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ',
                        ],
                    ],
                ],
                [
                    'key'       => self::block_name . '_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value' => '',
                    'conditional_logic' => [
                        [
                            'field'     => self::block_name . '_show_btn',
                            'operator'  => '==',
                            'value'     => '1',
                        ],
                    ],
                ], 
                [
                    'key'       => self::block_name . '_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [
                        [
                            'key'   => self::block_name . '_item_img',
                            'name'  => 'image',
                            'label' => 'Image',
                            'type'  => 'image',
                        ],
                        [
                            'key'   => self::block_name . '_item_name',
                            'name'  => 'name',
                            'label' => 'Name',
                            'type'  => 'text',
                        ],
                        [
                            'key'   => self::block_name . '_item_title',
                            'name'  => 'title',
                            'label' => 'Title',
                            'type'  => 'text',
                        ], 
                        [
                            'key'   => self::block_name . '_item_decription',
                            'name'  => 'description',
                            'label' => 'Description',
                            'type'  => 'text',
                        ],
                        [
                            'key'   => self::block_name . '_item_score',
                            'name'  => 'score',
                            'label' => 'Score',
                            'type'  => 'text',
                        ],    
                        [
                            'key'   => self::block_name . '_item_url',
                            'name'  => 'url',
                            'label' => 'Affiliate Link',
                            'type'  => 'url',
                        ],    
                    ],
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

        return $context;
    }
}
