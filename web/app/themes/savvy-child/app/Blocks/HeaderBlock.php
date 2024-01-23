<?php

namespace ScTheme\Blocks;

class HeaderBlock extends AbstractBlock {
    const block_name    = 'vv-header';
    const title         = 'VV Header';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter( 'vv_block_render_context__' . self::block_name, [$this, 'modifyContext'] );
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
                    'key'       => self::block_name . '_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => 'Title',
                ],
                [
                    'key'       => self::block_name . '_intro',
                    'name'      => 'intro',
                    'label'     => 'Intro',
                    'type'      => 'wysiwyg',
                    'tabs'      => 'all',
                    'toolbar'   => 'full',
                ],
                [
                    'key'       => self::block_name . '_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => 'Try our VPN comparison tool',
                ],
                [ 
                    'key'       => self::block_name . '_btn_link',
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

    public function modifyContext( $context ) {
        $context['icon_type'] = $context['fields']['theme'] ?? '';

        return $context;
    }
}
