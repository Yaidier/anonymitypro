<?php

namespace ScTheme;

/**
 * The main controller class
 *
 * @author Yaidier Perez
 * */
class App {

	public static function init() {
        self::init_controllers();
    }

    public static function init_controllers() {
        Controllers\ChildThemeController::init();
        Controllers\WidgetsController::init(); 
        Controllers\BlocksController::init(); 
    }
}
