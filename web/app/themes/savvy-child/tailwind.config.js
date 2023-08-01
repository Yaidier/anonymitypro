const plugin = require('tailwindcss/plugin')

module.exports = {
    presets: [
        require('./tailwind-base')
    ],
    content: [
        "./templates/**/*.{html,js,twig}",
        "./app/SavvyBuilder/templates/**/*.{html,js,twig}",
    ],
};
