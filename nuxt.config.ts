import EnvCompatPlugin from 'vite-plugin-env-compatible'
import { nodeResolve as NodeResolvePlugin } from '@rollup/plugin-node-resolve'
import { name, version } from './package.json'

//
const {
  SITE_TITLE: siteTitle = 'Growth Zone Model Logbooks',
  BRANCH: branch = 'branch',
  COMMIT_REF: shaRef = 'commit'
} = {}

//
const buildName = [branch, shaRef]
  .filter(part => typeof part === 'string')
  .map(part => part.slice(0, 6))
  .join('.')

export default defineNuxtConfig({
  // bridge: {
  //   // Use Vite as the bundler instead of webpack 4
  //   vite: true,

  //   // Enable Nuxt 3 compatible useHead
  //   meta: true,
  // },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // https://nuxtjs.org/guide/runtime-config
  runtimeConfig: {
  public: {
    siteTitle,
    appInfo: { name, version, branch, shaRef, buildName },

    services: {
      dropboxAppKey: process.env.DROPBOX_APP_KEY,
      googleDriveClientId: process.env.GOOGLE_DRIVE_CLIENT_ID
    }
  },
},

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${siteTitle} (${buildName})`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: ''
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/globals',
    // '~/plugins/database.client',
    // '~/plugins/storage.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',

    // https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',

    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    // '@nuxtjs/eslint-config-typescript',

    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',

    // https://vueformulate.com/guide
    // '@braid/vue-formulate/nuxt',

    '@formkit/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  //
  generate: {
    // fallback: true,
  },

  devServerHandlers: [],

  colorMode: {
    classSuffix: ''
  },

  tailwindcss: {
    // add '#tailwind-config` alias
    exposeConfig: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: siteTitle,
      description: `Track your learning with the growth zone model. Build ${buildName}`,
      theme_color: '#f4a261',
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      // './data/config.ts',
      // 'remotestorage-widget',
      // 'lokijs',
      // 'rxdb',
      // 'rxdb/plugins/dev-mode'
      // 'spark-md5',
      // 'pouchdb-utils',
      // 'pouchdb-errors',
      // 'nuxt',
      // '@nuxt/bridge-edge',
      // 'immediate'
    ]
    // aggressiveCodeRemoval: true,
  },

  // alias: { global: 'global.ts' }
  vite: {
    plugins: [
      // NodeResolvePlugin(),
      // EnvCompatPlugin()
    ],

    define: {
      global: 'window',
      process: { env: { DEBUG: undefined } }
    },

    build: {

    },

    /* options for vite */
    optimizeDeps: {
      // allowNodeBuiltins: ["pouchdb-browser", "pouchdb-utils"],
      // esbuildOptions: {},
    }
  },

  compatibilityDate: '2025-01-20'
})