<?php

namespace SavvyTheme;

/**
 * The main controller class
 *
 * @author Yaidier Perez
 * */
class App {

	public static function init() {
        /**
         * If preflight do not pass,
         * then do not execute the theme.
         */
        if( !self::preflight_check() ) {
            return;
        }
     
        self::init_controllers();
    }

    public static function init_controllers() {
        Controllers\ThemeController::init(); /** Core Module */
        Controllers\OptimizationsController::init(); /** Optional Module */
        Controllers\FrontendController::init(); /** Core Module */
        Controllers\BackendController::init();  
        Controllers\AmpController::init(); /** Optional Module */
        Controllers\AjaxController::init(); /** Core Module */
        Controllers\MultilangugeController::init(); /** Optional Module */
        Controllers\SecurityController::init(); /** Optional Module */
        Controllers\StructuredDataController::init(); /** Optional Module */
        Controllers\CoreWidgetsController::init(); /** Optional Module */
    }

    public static function preflight_check() {
        $functions_check = [
            'acf_register_block_type'   => 'ACF Pro Plugin',
            'pll_current_language'      => 'Polylang Pro Plugin',
        ];

        /**
         * Preflight Check
         */
        foreach( $functions_check as $function => $dependency  ) {
            if( !function_exists( $function ) ){

                add_action(
                    'admin_notices',
                    function() use ( $dependency ) {
                        echo '<div class="error"><p>WARNING! Theme might be broken! This Theme needs '. $dependency .'</p></div>';
                    }
                );
    
                return false;
            }

            return true;
        }
    }
}