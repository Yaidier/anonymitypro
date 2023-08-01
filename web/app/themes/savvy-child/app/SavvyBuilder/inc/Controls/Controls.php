<?php

namespace NBuilder\Controls;

use NBuilder\App;

class Controls {

	const TEXT      = 'text';
	const SELECT    = 'select';
	const STYLE     = 'style';
	const DIVIDER   = 'divider';

    public static function render( $control_data, $value ){

        switch ( $control_data['type'] ) {
            case 'select':
                $rendered_control = self::render_control_select( $control_data, $value );
                break;
            case 'text':
                $rendered_control = self::render_control_text( $control_data, $value );
                break;
            case 'divider':
                $rendered_control = '<div class="nb_control_wrap"><hr class="nb-control_divider" ></div>';
                break;
            
            default:
                $rendered_control = '';
                break;
        }

        return $rendered_control;
    }

    private static function get_conditions( $control_data ) {
        $conditions_attr = '';
        $index = 0;
        foreach( ( $control_data['condition'] ?? [] )  as $target => $value ){
            $conditions_attr .= 'data-cond-target-'. $index .'="'. $target .'" data-cond-value-'. $index .'="'. $value .'"';
            $index++;
        }

        $conditions_attr = ( $conditions_attr ) ? 'data-hasconditions="true" ' . $conditions_attr : '';

        return $conditions_attr;
    }

    private static function render_control_select( $control_data, $value ) {
        /**
         * data-uof stands for "update on the fly"
         */
        $responsive_btns = '<div class="nb-control_responsive_btns">';
        $responsive_btns .= '<a class="nb-control_resp_btn nb-control_desktop active" data-screen="desktop"><i class="fa-solid fa-desktop"></i></a>';
        $responsive_btns .= '<a class="nb-control_resp_btn nb-control_tablet" data-screen="tablet"><i class="fa-solid fa-tablet-screen-button"></i></a>';
        $responsive_btns .= '<a class="nb-control_resp_btn nb-control_mobile" data-screen="mobile"><i class="fa-solid fa-mobile-screen-button"></i></a>';
        $responsive_btns .= '</div>';
        
        $label      = '<label><span>' . ( $control_data['label'] ?? 'Input' ) . '</span>'. $responsive_btns .'</label>';

        $select     = '<div class="nb-editor_input_wrap"><select id="" name="" value="'. $value .'">';
        foreach( $control_data['options'] as $option_value => $option_label ){
            $selected = ( $option_value == $value ) ? 'selected="selected"' : '';
            $select .= '<option value="'. $option_value .'" '. $selected .'>'. $option_label .'</option>';
        }
        $select .= '</select></div>';

        /**
         * Get conditions attributes.
         */
        $conditions_attr = self::get_conditions( $control_data );

        $control = '<div class="nb_control_wrap" data-uof="true" data-type="'. $control_data['type'] .'" data-controlid="'. $control_data['control_id'] .'" '. $conditions_attr .' >'. $label . $select .'  </div>';

        return $control;
    }

    private static function render_control_text( $control_data, $default_value ) {
        /**
         * data-uof stands for "update on the fly"
         */

        $post_data  = App::instance()::$post_data;
        $value      = $post_data[$control_data['block_id']][$control_data['control_id']] ?? '';

        /**
         * Get conditions attributes.
         */
        $conditions_attr = self::get_conditions( $control_data );
        
        $label = '<label>' . ( $control_data['label'] ?? 'Input' ) . '</label>';
        $control = '<div class="nb_control_wrap" data-uof="true" data-type="'. $control_data['type'] .'" data-controlid="'. $control_data['control_id'] .'" '. $conditions_attr .' >'. $label  .'<input type="text" value="'. $default_value .'">'. '</div>';

        return $control;
    }
}