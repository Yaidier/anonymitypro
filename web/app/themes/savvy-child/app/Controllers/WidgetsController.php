<?php

namespace ScTheme\Controllers;

/**
 * The Widgets Controller Class
 *
 * @author Yaidier Perez
 * */

class WidgetsController {

    static public function init() {
        add_action( 'widgets_init', [ self::class, 'register_widtgets' ] );
    }

    public static function register_widtgets() {
        register_widget('\ScTheme\Widgets\TopVpnSidebarWidget');
    }
}
