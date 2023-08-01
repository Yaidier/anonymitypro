/**
 * Tailwind Configuratoin File for:
 * 
 * archive, categories, template-vpn-comparison,
 * page, template-single-generate, template-what-is-my-ip.
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
        "./templates/widgets/table-of-contents.twig",
        "./templates/widgets/table-of-contents-menu.twig",

        // Archive and Categories
        "./templates/partials/archive-body.twig",
        "./templates/archives/category.twig",
        "./templates/blocks/post-blog.twig",

        // Pages
        "./templates/posts/what-is-my-ip.twig",
        "./templates/posts/vpn-comparison.twig",
        "./templates/posts/single-generate.twig",
        "./templates/posts/page.twig",
        "./templates/posts/pspt-single.twig",
        "./templates/archives/authors.twig",

        // Blocks
        "./templates/blocks/content-image.twig",
    ],
};