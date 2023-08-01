<?php
/**
 * Child Theme Starter
 *
 * @package Savvychild
 * */

use Timber\Timber;
use ScTheme\App as SavvyChild;

define( 'SAVVYCHILD_THEME_DIR_URI', get_stylesheet_directory_uri() );
define( 'SAVVYCHILD_THEME_DIR', __DIR__ );

/**
 * We need composer autoload and Timber on this Theme
 * 
 */
$composer_autoload = SAVVYCHILD_THEME_DIR . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
    require_once( $composer_autoload );

	$timber = new Timber();
}

SavvyChild::init();

function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
add_filter('upload_mimes', 'cc_mime_types');
