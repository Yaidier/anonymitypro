const mix = require("laravel-mix");
const tailwindcss = require('tailwindcss'); 
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
     * All the Theme JS
     */
    .js("src/js/sc-app.js", "assets/js/all.js")

    /**
     * All the Theme CSS
     */
    .postCss("src/sass/temp/.sass-output.css", "assets/css/all.css", [
        require("tailwindcss")("./tailwind.config.js"),
    ])
    .sass("src/sass/app.scss", "src/sass/temp/.sass-output.css")
    
    /**
     * Laravel Mix Options
     */
    .options({
        processCssUrls: false,
    })
    .version()
    .disableNotifications();
