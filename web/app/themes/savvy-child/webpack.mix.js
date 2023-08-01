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
     * Savvy Builder Editor App
     */
    // .js("app/SavvyBuilder/src/js/editor.js", "app/SavvyBuilder/public/js/nb-editor.js")

    /**
     * Savvy Builder All CSS
     */
    // .sass("app/SavvyBuilder/src/sass/editor.scss", "app/SavvyBuilder/public/css/nb-editor.css")

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
     * First Content Paint (FCP) for Home
     */
    .postCss("src/sass/temp/.sass-fcp-home-output.css", "assets/css/ps-fcp-home.css", [require("tailwindcss")("./tailwind-fcp-home.config.js"),])
    .sass("src/sass/fcp-home.scss", "src/sass/temp/.sass-fcp-home-output.css")

    /**
     * First Content Paint (FCP) for Single
     */
    .postCss("src/sass/temp/.sass-fcp-single-output.css", "assets/css/ps-fcp-single.css", [require("tailwindcss")("./tailwind-fcp-single.config.js"),])
    .sass("src/sass/fcp-single.scss", "src/sass/temp/.sass-fcp-single-output.css")

    /**
     * First Content Paint (FCP) for Archive
     */
    .postCss("src/sass/temp/.sass-fcp-archive-output.css", "assets/css/ps-fcp-archive.css", [require("tailwindcss")("./tailwind-fcp-archive.config.js"),])
    .sass("src/sass/fcp-archive.scss", "src/sass/temp/.sass-fcp-archive-output.css")

    /**
     * Later Resource Call (LRC) Theme CSS
     */
    .postCss("src/sass/temp/.sass-lrc-output.css", "assets/css/ps-lrc.css")
    .sass("src/sass/lrc.scss", "src/sass/temp/.sass-lrc-output.css")
    
    /**
     * Laravel Mix Options
     */
    .options({
        processCssUrls: false,
    })
    .version()
    .disableNotifications();
