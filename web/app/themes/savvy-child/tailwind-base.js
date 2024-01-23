const { transform } = require('lodash');
const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            primary: {
                800: "#07044D",
                700: "#060181",
            },
            secondary: {
                700: "#3F16B6",
            },
            dark: {
                700: "#071628",
                300: "#435263",
                100: "#EBF1F7",
            },
            white: "#FFFFFF",
            black: "#000000",
            transparent: "#FFF0",
            assent: {
                700: '#E6DE1A',
            },
        },
        fontSize: {
            size_50: ["3.125rem", "1.3em"],
            size_40: ["2.5rem", "1.3em"],
            size_36: ["2.25rem", "1.3em"],
            size_32: ["2rem", "1.3em"],
            size_24: ["1.5rem", "1.3em"],
            size_22: ["1.375rem", "1.3em"],
            size_19: ["1.188rem", "1.3em"],
            size_17: ["1.063rem", "1.3em"],
            size_16: ["1rem", "1.3em"],
            size_14: ["0.875rem", "1.3em"],


            size_90: ["5.625rem", "1.3em"],
            size_60: ["3.75rem", "1.3em"],
            size_18: ["1.125rem", "1.6em"],
            size_15: ["0.938rem", "1.3em"],
            size_13: ["0.813rem", "1.3em"],
            size_12: ["0.75rem", "1.3em"],
            size_12: ["0.688rem", "1.3em"],

        },
        fontFamily: {
            opensans: ["'Open Sans', sans-serif;"],
            roboto: ["'Roboto', sans-serif;"],
            oswald: ["'Oswald', sans-serif;"],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "15px",
                lg: "0px",
            },
        },
        groups: ['level2', 'level3'],
        screens: {
      
            'xl': {'max': '1319px'},
            // => @media (max-width: 1279px) { ... }
      
            'lg': {'max': '1230px'},
            // => @media (max-width: 1023px) { ... }
      
            'md': {'max': '767px'},
            // => @media (max-width: 767px) { ... }
      
            'sm': {'max': '639px'},
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            boxShadow: {
                'cards': '2px 2px 20px rgba(25, 26, 36, 0.18)',
                'cards-hover': '2px 2px 27px rgba(25, 26, 36, 0.27)',
                //
                'carousel': '0px 10px 17px rgba(0, 0, 0, 0.05)',
                'ads-page': '0px 4px 40px rgba(0, 0, 0, 0.05)',
                'ads-page-hover': '0px 4px 35px rgba(0, 0, 0, 0.10)',
                'color-orange': '0px 10px 30px rgba(226, 93, 4, 0.2);',
            },
            spacing: {
                '130': '540px',
                '135': '570px',
            },
            maxWidth: {
                '540': '540px',
            },
            backgroundImage: {
                'icon-logo-grey': "url('/app/themes/savvy-child/assets/svg/ps-icon-logo-grey.svg')",
                'arrow-right-primary': "url('/app/themes/savvy-child/assets/svg/ps-icon-arrow-right.svg')",
                'arrow-right-dark': "url('/app/themes/savvy-child/assets/svg/ps-icon-arrow-right-black.svg')",
                'arrow-right-white': "url('/app/themes/savvy-child/assets/svg/ps-icon-arrow-right-white.svg')",
                'bkgd-abstract': "url('/app/themes/savvy-child/assets/images/ps-bkgd-abstract.jpg')",
                'bg-abstract': "url('/app/themes/savvy-child/assets/images/ps-bg-abstract.png')",
                'icon-checkbox-green': "url('/app/themes/savvy-child/assets/svg/ps-icon-checkbox-green.svg')",
                'icon-double-quotes': "url('/app/themes/savvy-child/assets/svg/ps-icon-double-quotes.svg')",
                'separator-wave': "url('/app/themes/savvy-child/assets/svg/ps-separator-wave.svg')",

                'home-hero': "url('/app/themes/savvy-child/assets/images/vv-bg-home.png')",
            },
            animation: {
                fade_in_0: 'fadeOut 0.4s ease-in-out 0s forwards ',
                fade_in_1: 'fadeOut 0.4s ease-in-out 0.1s forwards ',
                fade_in_2: 'fadeOut 0.4s ease-in-out 0.2s forwards ',
                fade_in_3: 'fadeOut 0.4s ease-in-out 0.3s forwards ',
                fade_in_4: 'fadeOut 0.4s ease-in-out 0.4s forwards ',
            },
            keyframes: theme => ({
                fadeOut: {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateX(-30px)'

                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'translateX(0px)'
                    },
                },
            }),
        }
    },
    corePlugins: {
        container: false,
    },
    plugins: [
        function({ addComponents }) {
            addComponents({
                ".container": {
                    maxWidth: "1230px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "0px",
                    paddingRight: "0px",

                    "@screen lg": {
                        maxWidth: "100%",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                    },
                },
            });
        },
        plugin(({ addVariant, theme }) => {
            const groups = theme('groups') || []
      
            groups.forEach((group) => {
              addVariant(`group-${group}-hover`, () => {
                return `:merge(.group-${group}):hover &`
              })
            })
        }),
    ],
};
