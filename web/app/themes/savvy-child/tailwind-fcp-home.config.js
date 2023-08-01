/**
 * 
 * Tailwind Configuratoin File for home page.
 * 
 */

const plugin = require('tailwindcss/plugin')

module.exports = {
    presets: [
        require('./tailwind-base')
    ],
    content: [
        // All Pages
        "./templates/layouts/base.twig", 
        "./templates/partials/topbar.twig", 
        "./templates/partials/header-menu.twig",
        "./templates/partials/menu-iterator.twig",
        "./templates/partials/icons.twig",
        "./templates/partials/cookie-bar.twig",

        //Home
        "./templates/pages/page-home.twig",
        "./templates/blocks/brandlogo.twig",
        "./templates/blocks/content-image.twig",
    ],
};