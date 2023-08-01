<?php

namespace ScTheme\Blocks;

class ButtonBlock extends AbstractBlock {
    const block_name    = 'vv-button';
    const title         = 'VV Button';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('vv_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => 'vv_button_field_group',
            'title'     => 'Button',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'label'     => self::title,
                ],
                [
                    'key'       => 'vv_block_button_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => '',
                ],
                [
                    'key'       => 'vv_block_button_btn_link',
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
