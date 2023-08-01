<?php

namespace ScTheme\Blocks;

class BannerFooterBlock extends AbstractBlock {
    const block_name    = 'vv-bannerfooter';
    const title         = 'VV Banner Footer';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('ev_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_bannerfooter_field_group',
            'title'     => 'Banner Footer Settings',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'label'     => self::title,
                ],

                [
                    'key' => 'vv_block_bannerfooter_img',
                    'name' => 'image',
                    'label' => 'Image',
                    'type' => 'image',
                ],
                [
                    'key' => 'vv_block_bannerfooter_name',
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'text',
                ],
                [
                    'key' => 'vv_block_bannerfooter_intro',
                    'name' => 'intro',
                    'label' => 'Intro',
                    'type'    => 'texto',
                    
                ], 
                [
                    'key'       => 'vv_block_bannerfooter_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => '',
                ],
                [
                    'key'       => 'vv_block_bannerfooter_btn_link',
                    'name'      => 'btn_link',
                    'label'     => 'Button Link',
                    'type'      => 'url',
                    'default_value' => '',
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
