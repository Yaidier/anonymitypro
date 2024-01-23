<?php

namespace ScTheme\Blocks;

class ImageAndContentBlock extends AbstractBlock {
    const block_name    = 'vv-imageandcontent';
    const title         = 'VV Image And Content';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter('ev_block_render_context__' . self::block_name, [$this, 'modifyContext']);
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => self::block_name . '_field_group',
            'title'     => 'Image And Content Settings',
            'fields'    => [
                [
                    'key'       => self::block_name . '_label',
                    'label'     => self::title,
                ],
                [
                    'key'   => self::block_name . '_item_img',
                    'name'  => 'image',
                    'label' => 'Image',
                    'type'  => 'image',
                ],
                [
                    'key'   => self::block_name . '_item_title',
                    'name'  => 'title',
                    'label' => 'Title',
                    'type'  => 'text',
                ],
                [
                    'key'       => self::block_name . '_item_intro',
                    'name'      => 'intro',
                    'label'     => 'Intro',
                    'type'      => 'wysiwyg',
                    'tabs'      => 'all',
                    'toolbar'   => 'full',
                ], 
                [
                    'key'       => self::block_name . '_invert',
                    'name'      => 'invert',
                    'label'     => 'Invert Content',
                    'type'      => 'true_false',
                    'ui'        => 1,
                ],
                [
                    'key'       => self::block_name . '_btn_name',
                    'name'      => 'btn_name',
                    'label'     => 'Button Name',
                    'type'      => 'text',
                    'default_value' => '',
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

    public function modifyContext($context) {
        $context['icon_type'] = $context['fields']['theme'] ?? '';

        return $context;
    }
}
