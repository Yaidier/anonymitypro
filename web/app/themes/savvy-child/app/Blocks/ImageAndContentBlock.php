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
            'key'       => 'vv_block_imageandcontent_field_group',
            'title'     => 'Image And Content Settings',
            'fields'    => [
                [
                    'key'       => 'vv_block_' . self::block_name . '_label',
                    'label'     => self::title,
                ],
               
                [
                    'key' => 'vv_block_imageandcontent_title',
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'text',
                ],
                [
                    'key'       => 'vv_block_imageandcontent_items',
                    'name'      => 'items',
                    'label'     => 'Items',
                    'type'      => 'repeater',
                    'layout'    => 'block',
                    'sub_fields' => [

                        [
                            'key' => 'vv_block_imageandcontent_item_img',
                            'name' => 'image',
                            'label' => 'Image',
                            'type' => 'image',
                        ],
                        [
                            'key' => 'vv_block_imageandcontent_item_name',
                            'name' => 'name',
                            'label' => 'Name',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'vv_block_imageandcontent_item_intro',
                            'name' => 'intro',
                            'label' => 'Intro',
                            'type'    => 'wysiwyg',
                            'tabs'    => 'all',
                            'toolbar' => 'full',
                        ], 
                        [
                            'key'       => 'vv_block_imageandcontent_invert',
                            'name'      => 'invert',
                            'label'     => 'Inver Content',
                            'type'      => 'true_false',
                            'ui'        => 1,
                        ],
                        [
                            'key'       => 'vv_block_imageandcontent_buttons',
                            'name'      => 'buttons',
                            'label'     => 'Items',
                            'type'      => 'repeater',
                            'layout'    => 'block',
                            'sub_fields' => [
                                [
                                    'key'       => 'vv_block_imageandcontent_btn_name',
                                    'name'      => 'btn_name',
                                    'label'     => 'Button Name',
                                    'type'      => 'text',
                                    'default_value' => '',
                                ],
                                [
                                    'key'       => 'vv_block_imageandcontent_btn_link',
                                    'name'      => 'btn_link',
                                    'label'     => 'Button Link',
                                    'type'      => 'url',
                                    'default_value' => '',
                                ],
                            ],
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

    public function modifyContext($context) {
        $context['icon_type'] = $context['fields']['theme'] ?? '';

        return $context;
    }
}
