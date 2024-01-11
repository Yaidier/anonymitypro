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
        Controllers\WidgetsController::init(); /** From Child Theme Module */
        // Controllers\TaxonomyController::init(); /** Optional Module */
        // Controllers\PostTypeController::init(); /** Optional Module */
        Controllers\BlocksController::init(); /** From Child Theme Module */

        \ScTheme\SavvyBuilder\SavvyBuilder::init();
    }
}