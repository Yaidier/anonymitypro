/**
 * 
 * Tailwind Configuratoin File for:
 * 
 * single cpt
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
        "./templates/partials/subheader.twig",
        "./templates/partials/breadcrumbs.twig",
        "./templates/partials/info-box.twig",
        
        // // Single
        "./templates/posts/pspt-single.twig",
        "./templates/partials/tldr.twig",
        "./templates/widgets/table-of-contents.twig",
        "./templates/widgets/table-of-contents-menu.twig",
        "./templates/widgets/top-vpn-sidebar.twig",
        "./templates/blocks/alert-box.twig",
        "./templates/posts/post.twig",
        "./templates/widgets/review-banner.twig",
    ],
};