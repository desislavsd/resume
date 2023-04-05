import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  plugins: [
    typography,
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(['carbon', 'fa-brands']),
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Rubik', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#000', //;theme('colors.gray.800'),

            // ...
          },
        },
      }),
    },
  },
}
