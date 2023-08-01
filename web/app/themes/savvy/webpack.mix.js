const mix = require("laravel-mix");
    /*
     |--------------------------------------------------------------------------
     | Mix Asset Management
     |--------------------------------------------------------------------------
     |
     | Mix provides a clean, fluent API for defining some Webpack build steps
     | for your Laravel applications. By default, we are compiling the CSS
     | file for the application as well as bundling up all the JS files.
     |
     */

    /**
     * Setting Public Path to Project's
     */
    mix.setPublicPath("./")

    /**
     * Admin JS
     */
    .js("src/js/savvy-admin.js", "assets/js/savvy-admin.js")

    /**
     * Admin CSS
     */
    .sass("src/sass/admin.scss", "assets/css/savvy-admin.css")
    
    /**
     * Laravel Mix Options
     */
    .options({
        processCssUrls: false,
    })
    .version()
    .disableNotifications();