<?php

namespace SavvyTheme\Controllers;

class BaseController {

    public static $theme_prefix = 'savvy';

    protected static function is_controller_active( string $controller = '' ){
        return get_option( 'options_' . self::$theme_prefix . '_controllers_' . $controller );
    }

}