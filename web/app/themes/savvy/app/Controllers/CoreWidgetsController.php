<?php

namespace SavvyTheme\Controllers;

/**
 * The Widgets Controller Class
 *
 * @author Yaidier Perez
 * */

class CoreWidgetsController {

    static public function init() {
        add_action(
            'widgets_init',
            array( self::class, 'register_widtgets' )
        );

        add_action(
            'widgets_init',
            array( self::class, 'unregister_widtgets' )
        );
    }

    public static function register_widtgets() {
        register_widget( '\SavvyTheme\Widgets\TableOfContentsWidget' );
    }

    public static function unregister_widtgets() {
        unregister_widget('MC4WP_Form_Widget');
        unregister_widget('WP_Widget_Pages');
        unregister_widget('WP_Widget_Calendar');
        unregister_widget('WP_Widget_Archives');
        unregister_widget('WP_Widget_Links');
        unregister_widget('WP_Widget_Media_Audio');
        unregister_widget('WP_Widget_Media_Image');
        unregister_widget('WP_Widget_Media_Video');
        unregister_widget('WP_Widget_Media_Gallery');
        unregister_widget('WP_Widget_Meta');
        unregister_widget('WP_Widget_Search');
        unregister_widget('WP_Widget_Recent_Posts');
        unregister_widget('WP_Widget_Recent_Comments');
        unregister_widget('WP_Widget_RSS');
        unregister_widget('WP_Widget_Tag_Cloud');
        unregister_widget('WP_Nav_Menu_Widget');
        unregister_widget('WP_Widget_Custom_HTML');
    }
}
