<?php

namespace SavvyTheme\Controllers;

/**
 * The Security Controller Class
 *
 * @author Yaidier Perez
 * */

class SecurityController {
    public static function init() {
        self::changing_login_file_to( 'ps-access.php' );
        self::remove_wp_admin_redirect();
        self::adding_recaptcha_to_login();
    }

    public static function adding_recaptcha_to_login() {
        /**
         * Do nothing if we are not in login page.
         */
        if ( $GLOBALS[ 'pagenow' ] !== 'wp-login.php' && $GLOBALS['pagenow'] !== 'ps-access.php' ) {
            return;
        }

        $site_key   = get_field( 'ps_theme_settings_security_recpatcha_site_key', 'option' );
        $secret_key = get_field( 'ps_theme_settings_security_recpatcha_secret_key', 'option' );
        $is_active  = get_field( 'ps_theme_settings_security_recpatcha_active', 'option' );
        
        /**
         * Do nothing if one of the recaptchas keys are missing
         */
        if( !$site_key || !$secret_key || !$is_active ){
            return;
        }
        
        /**
         * Load recaptcha javascript API
         */
        add_action( 'login_enqueue_scripts', function() {
            wp_enqueue_script( 'recaptcha_login', 'https://www.google.com/recaptcha/api.js' );
        } );

        /**
         * Change some styles on the wp login page
         */
        add_action( 'login_head', function() {
            ?>
            <style>
                /**
                * Removing the shake animation when user/pass are wrong.
                */
                #loginform {
                    animation: none;
                    transform: none;
                    animation-iteration-count: 0;
                }
    
                /**
                * Adding shake animation on error to the error message instead.
                */
                .login #login_error {
                    animation: shake .2s cubic-bezier(.19,.49,.38,.79) both;
                    animation-iteration-count: 3;
                    transform: translateX(0);
                }
            </style>
            <?php
        } );

        /**
         * Register recaptcha event on the login button
         */
        add_action( 'login_footer', function() use ( $site_key ) {
            ?>
            <script>
                function wp_login_recaptcha_init() {
                    let wp_submit_btn = document.querySelector('#wp-submit');
        
                    wp_submit_btn.classList.add('g-recaptcha');
                    wp_submit_btn.setAttribute('data-sitekey', '<?php echo $site_key ?>');
                    wp_submit_btn.setAttribute('data-callback', 'onSubmit');
                    wp_submit_btn.setAttribute('data-size', 'invisible');
                }
        
                function onSubmit(token) {
                    document.getElementById('loginform').submit();
                }
        
                if (document.readyState != "loading") {
                    wp_login_recaptcha_init();
                }
                else {
                    document.addEventListener("DOMContentLoaded", () => {
                        wp_login_recaptcha_init();
                    });
                }
            </script>
            <?php
        } );

        /**
         * Validate the captcha and returning either access to wp admin or returning an error.
         */
        add_filter( 'wp_authenticate_user', function( $user ) use ( $secret_key ) {
            /**
             * If captcha token is set then verify it
             */
            if ( isset( $_POST[ 'g-recaptcha-response' ] ) ) {
                $response = wp_remote_get( 'https://www.google.com/recaptcha/api/siteverify?secret=' . $secret_key . '&response=' . $_POST[ 'g-recaptcha-response' ] );
                $response = json_decode( $response[ 'body' ], true );

                if ( true == $response[ 'success' ] ) {
                    return $user;
                }
            } 

            if ( 'invalid-input-secret' == $response[ 'error-codes' ][0] || 'invalid-input-response' == $response[ 'error-codes' ][0] ) {
                return new \WP_Error( 'Captcha Invalid', __('<strong>ERROR</strong>: Secret Key is wrong') );
            }

            return new \WP_Error( 'Captcha Invalid', __('<strong>ERROR</strong>: You are a bot. If not then enable JavaScript.') );
        } );
    }

    /**
     * Change the physical wp-login.php file to the one set on the the argument.
     */
    public static function change_physical_file_to( string $new_login_file ){
        global $wp_version;

        if( get_option( 'ps_change_login_file' ) === (string) 'sfsdfs' ){
            return true;
        }

        /**
         * If the original wp-login.php file do not exists, and the new 
         * login file exist, then we assume the process was completed previously,
         * then just return.
         */
        if( !file_exists( ABSPATH . 'wp-login.php' ) && file_exists( ABSPATH . $new_login_file ) ) {
            update_option( 'ps_change_login_file', $wp_version );
            return true;
        }

        /**
         * If we can read the original file then return.
         */
        if( !$wp_login_file = fopen( ABSPATH . 'wp-login.php', 'r') or false ){
            return false;
        }

        /**
         * If we can't write a new file then return.
         */
        if( !$new_wp_login_file = fopen( ABSPATH . $new_login_file, 'w') or false ){
            return false;
        }

        /**
         * Replacing the content of the new login file ($new_login_file)
         */
        $wp_login_file_content      = fread( $wp_login_file, filesize( ABSPATH . 'wp-login.php' ) );
        $new_wp_login_file_content  = str_replace( 'wp-login.php', $new_login_file, $wp_login_file_content );
        
        if( !fwrite( $new_wp_login_file, $new_wp_login_file_content ) ){
            return false;
        }

        /**
         * Renaming the original file
         */
        if( !rename( ABSPATH . 'wp-login.php', ABSPATH . 'old-login-access.bak' ) ){
            return false;
        }

        update_option( 'ps_change_login_file', $wp_version );
        return true;
    }

    public static function changing_login_file_to( string $new_login_file ) {
        if( !self::change_physical_file_to( $new_login_file ) ){
            return;
        }

        add_filter( 'login_url', function() use ( $new_login_file ) {
            return site_url( $new_login_file, 'login' );

        }, PHP_INT_MAX );

        add_filter( 'logout_url',  function( $logout_url ) use ( $new_login_file ) {
            $logout_url = str_replace( 'wp-login.php', $new_login_file, $logout_url );
        
            return $logout_url;
        }, 1000 );
    }

    public static function remove_wp_admin_redirect(){
        add_action( 'init', function() {
            remove_action( 'template_redirect', 'wp_redirect_admin_locations', 1000 );

        });

        add_filter( 'auth_redirect_scheme', function( $scheme ) {
            if ( wp_validate_auth_cookie( '',  $scheme ) ) {
                return $scheme;
            }

            exit();
        }, 9999 );
    }
}
