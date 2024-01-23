<?php

namespace ScTheme\Blocks;

class TeamBlock extends AbstractBlock {
    const block_name    = 'vv-team';
    const title         = 'VV Team';
    const icon          = 'megaphone';

    public function afterRegister() {
        $this->registerFields();
        add_filter( 'vv_block_render_context__' . self::block_name, [$this, 'modifyContext'] );
    }

    public function registerFields() {
        acf_add_local_field_group([
            'key'       => self::block_name . '_field_group',
            'title'     => 'Team',
            'fields'    => [
                [
                    'key'       => self::block_name . '_label',
                    'name'      => 'label',
                    'label'     => 'Overview',
                ],
                [
                    'key'       => self::block_name . '_title',
                    'name'      => 'title',
                    'label'     => 'Title',
                    'type'      => 'text',
                    'default_value' => '',
                ],
                [
                    'key'       => self::block_name . '_intro',
                    'name'      => 'intro',
                    'label'     => 'Description',
                    'type'      => 'text',
                    'default_value' => '',
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
                [
                    'key'       => self::block_name . '_items',
                    'name'      => 'items',
                    'label'     => 'Team',
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
                            'key'   => self::block_name . '_item_position',
                            'name'  => 'position',
                            'label' => 'Position',
                            'type'  => 'text',
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

    public function modifyContext( $context ) {

        return $context;
    }
}
