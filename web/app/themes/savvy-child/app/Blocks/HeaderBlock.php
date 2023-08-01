<?php

namespace ScTheme\Blocks;

class HeaderBlock extends AbstractBlock {
    const block_name    = 'vv-header';
    const title         = 'VV Header';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_block_header_field_group',
            'title'     => 'Header',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'label'     => self::title,
                ],
                [
                    'key'       => 'vv_block_header_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => 'vv_block_header_intro',
                    'name'      => 'intro',
                    'label'     => 'Intro',
                    'type'      => 'wysiwyg',
                    'tabs'      => 'all',
                    'toolbar'   => 'full',
                ],
                [
                    'key'       => 'vv_block_header_img',
                    'name'      => 'image',
                    'label'     => 'Image',
                    'type'      => 'image',
                    'default_value' => '',
                ],
                [
                    'key'       => 'vv_block_header_style',
                    'name'      => 'style',
                    'label'     => 'Style Hero image',
                    'type'      => 'true_false',
                    'ui'        => 1,
                    'default_value' => '0',
                    'ui' => 1,
                ],
                [
                    'key'       => 'vv_block_header_img_position',
                    'name'      => 'img_position',
                    'label'     => 'Image Position',
                    'type'      => 'select',
                    'choices'   => [
                      'justify-start' => 'Left',
                      'justify-center' => 'Center',
                      'justify-end' => 'Right',
                        
                    ],
                    'default_value' => 'justify-center',
                    'conditional_logic' => [
                        [
                            'field' => 'ev_block_header_style',
                            'operator' => '==',
                            'value' => '1',
                        ],
                    ],
                ],
                [
                    'key'       => 'ev_block_header_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => 'Try our VPN comparison tool',
                   
                ],
                [ 
                    'key'       => 'ev_block_header_btn_link',
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
