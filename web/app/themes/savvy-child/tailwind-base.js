const { transform } = require('lodash');
const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            primary: {
                800: "#1B1340",
                700: "#6D4AFF",
                600: "#F7F5FF",
                400: "#361D9C",
                100: "#C5B7FF",
                //////////////////////
                
                
            },
            secondary: {
                800: "#32CFD1",
                700: "#1D8199",
                100: "#ecf5fa",

                //////////////////////
                
                
                600: "#151718",
                500: "#1d2127",
                400: "#30353e",
                300: "#21252d",
                200: "#555d68",
                 50: "#a5acb8",
                 40: "#555d68",
// 
                
                
                
                
            },
            random: {
                900: "#7F79B0",
                800: "#E8A0BA",
                700: "#B3A295",
                600: "#C78F8D",
                500: "#BEB2ED",
                400: "#BADB9E",
                300: "#6794E0",
                200: "#FDE9C0",
                100: "#9FA0A1",
            },
            dark: {
                800: "#372580",
                700: "#111827",
                600: "#494B7A",
                //////////////
                
                
                500: "#373741",
                400: "#4d4d4d",
                300: "#E0E0E0",
                200: "#F2F2F2",
                100: "#FAFAFA",
            },
            blue: {
                900: "#223770",
                800: "#03b1ee",
                700: "#2892d7",
                //////////////
                
                200: "#E2F3FF",
                150: "#EAF5FB",
                100: "#F7F9FB",
            },
            green: {
                700: "#68DBBA",
                600: "#48ca9e",
                500: "#23b223",
                200: "#D7F6ED",
            },
            orange: {
                700: "#f68000",
                // 
                
                200: "#FFF3E2",
            },
            pink: {
                700: "#FF99BE",
                200: "#FFEDF3",
            },
            red: {
                400: "#EB5757",
            },
            yellow: {
                700: "#F2C94C",
            },
            white: "#FFFFFF",
            black: "#000000",
            transparent: "#FFF0",
            dark_overlay: {
                600: "#000000ad",
                800: "#000000de",
            },
            breadcrumbs: {
                500: '#ECE2CB'
            },
            disclosure: {
                500: '#FDE2A9'
            },
            salmon: {
                500: '#FFBF95'
            },
        },
        fontSize: {
            h1: ["36px", "50px"],
            h2: ["36px", "50px"],
            h3: ["28px", "35px"],
            h4: ["20px", "30px"],
            h5: ["18px", "26px"],
            h6: ["14px", "24px"],
            xf: ["13px", "16px"],
            xs: ["14px", "24px"],
            sm: ["15px", "25px"],
            base: ["17px", "27px"],
            icon_small: ["20px", "20px"],
            icon: ["24px", "24px"],
            large: ["48px", "64px"],
            big: ["70px", "87px"],
            disclosure: ["12px", "26px"],

            size_90: ["5.625rem", "1.3em"],
            size_60: ["3.75rem", "1.3em"],
            size_50: ["3.125rem", "1.3em"],
            size_40: ["2.5rem", "1.3em"],
            size_32: ["2rem", "1.3em"],
            size_24: ["1.5rem", "1.3em"],
            size_22: ["1.375rem", "1.3em"],
            size_19: ["1.188rem", "1.3em"],
            size_18: ["1.125rem", "1.6em"],
            size_17: ["1.063rem", "1.3em"],
            size_16: ["1rem", "1.3em"],
            size_15: ["0.938rem", "1.3em"],
            size_14: ["0.875rem", "1.3em"],
            size_13: ["0.813rem", "1.3em"],
            size_12: ["0.75rem", "1.3em"],
            size_12: ["0.688rem", "1.3em"],

        },
        fontFamily: {
            inter: ["var(--font_inter)"], //Font family declared in sass/components/variables.scss
            mulish: ["var(--font_mulish)"], // Font family declared in sass/components/variables.scss
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
      
            'lg': {'max': '1024px'},
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
