<?php
/**
 * Theme starter
 *
 * @package Privacysavvy
 * */

use Timber\Timber;
use SavvyTheme\App as Savvy;

define( 'SAVVY_THEME_DIR_URI', get_template_directory_uri() );
define( 'SAVVY_THEME_DIR', __DIR__ );
define( 'SAVVY_THEME_VERSION', '1.0.0' );

/**
 * We need composer autoload and Timber on this Theme
 */
$composer_autoload = SAVVY_THEME_DIR . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
    require_once( $composer_autoload );

	$timber = new Timber();
}

Savvy::init();