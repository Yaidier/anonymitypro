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

/**
 * Redirect all non-logged-in users to a specific page.
 */
function redirect_to_coming_soon_page() {
    /**
     * Do not redirec for development.
     */
    // if( strpos( home_url(), 'privacyradar.loc' ) !== false ){
    //     return;
    // }

    if ( ! is_user_logged_in() ) {
        $coming_soon_slug = 'coming-soon'; // Change this to your page's slug.
        $coming_soon_url = home_url( $coming_soon_slug );

        // Get the current URL path without home URL
        $requested_path = trim( parse_url( add_query_arg( [] ), PHP_URL_PATH ), '/' );

        // Get the expected path from the coming soon URL
        $expected_path = trim( parse_url( $coming_soon_url, PHP_URL_PATH ), '/' );

        // Redirect if the current path is not the expected path
        if ( $requested_path !== $expected_path ) {
            wp_redirect( $coming_soon_url );
            exit;
        }
    }
}
add_action( 'template_redirect', 'redirect_to_coming_soon_page' );

