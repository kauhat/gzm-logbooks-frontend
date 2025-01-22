// import pluginForms from '@tailwindcss/forms'
import pluginTypography from '@tailwindcss/typography'
import pluginDaisy from 'daisyui'
import daisyThemes from 'daisyui/src/theming/themes'

// console.log(daisyThemes)

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
function withOpacityValue (variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsla(var(${variable}))`
    }

    return `hsla(var(${variable}) / ${opacityValue})`
  }
}

export default {
  theme: {
    extend: {
      colors: {
        comfort: withOpacityValue('--color-comfort-hsl'),
        growth: withOpacityValue('--color-growth-hsl'),
        anxiety: withOpacityValue('--color-anxiety-hsl')
      },
      backgroundImage: theme => ({
        texture:
          'url("https://source.unsplash.com/collection/5019395/1600x900")',
        paper: 'url("https://pagecdn.io/lib/subtlepatterns/lined-paper-2.png")',
        doodles: 'url("https://pagecdn.io/lib/subtlepatterns/doodles.png")'
      })
    }
  },

  daisyui: {
    themes: daisyThemes
    // themes: ['light', 'cupcake', 'bumblebee'],
    // themes: [
    //   {
    //       light: {
    //         ...daisyThemes,
    //         '--comfort': '#2a9d8f',
    //         '--growth': '#f4a261',
    //         '--anxiety': '#e76f51',
    //       },
    //       // dark: {
    //       //   ...themes,
    //       //   '--comfort': '#2a9d8f',
    //       //   '--growth':  '#f4a261',
    //       //   '--anxiety': '#e76f51',
    //       // },
    //       cupcake: {
    //         ...daisyThemes,
    //         '--comfort': '#cdb4db',
    //         '--growth': '#ffc8dd',
    //         '--anxiety': '#ffafcc',
    //       },
    //       bumblebee: {
    //         ...daisyThemes,
    //         '--comfort': '#3d5a80',
    //         '--growth': '#98c1d9',
    //         '--anxiety': '#ee6c4d',
    //       },
    //     },
    //   ],
  },

  important: '#__nuxt',

  plugins: [
    // pluginForms,
    pluginTypography,
    pluginDaisy
  ],

  // content: ['formulate.config.*', 'nuxt.config.*', 'layouts/', 'components/**/*' ],
}
