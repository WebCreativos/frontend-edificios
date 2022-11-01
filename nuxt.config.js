import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Gestus360 - Administracion',
    title: 'Gestus360 - Administracion',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/icon.png'
    }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //baseURL: 'https://backlog.gestus360.com/api',
    baseURL:'http://localhost:1337/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  // nuxt auth module 
  auth: {
    autoLogout: true,
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/local/",
            method: "post",
            propertyName: "jwt"
          },
          logout: false,
          user: {
            url: "/users/me/?populate=*",
            method: "get",
            propertyName: false
          },
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: "/",
      logout: "/accounts/login",
      home: "/"
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    options: {
      customProperties: true,
    },
    theme: {
      treeShake: true,
      dark: false,
      themes: {
        light: {
          primary: "#333350",
          accent: colors.grey.darken3,
          secondary: "#ffca40",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          red: '#ff6240',
          yellow: "ffa927",
          success: "#4cc275"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
