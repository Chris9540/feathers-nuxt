const { resolve } = require('path');
const package = require('./package.json');
const config = require('./config/default.json');

const isDev = !['production', 'test'].includes(process.env.NODE_ENV);

module.exports = {
  dev: isDev,
  telemetry: false,
  components: true,
  srcDir: resolve(__dirname, './client'),
  router: { middleware: ['auth'] },
  build: {
    transpile: ['feathers-vuex', 'sweet-modal-vue']
  },
  env: { API_URL: process.env.API_URL || `http://localhost:${config.port}` },
  head: {
    title: `${package.name} — ${package.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' }
    ]
  },
  css: ['normalize.css/normalize.css', './client/assets/scss/global.scss'],
  plugins: [
    { src: '~/plugins/sweet-modal-vue.js', mode: 'client' },
    { src: '~/plugins/vue-select.js', mode: 'client' },
    { src: '~/plugins/vuelidate.js', mode: 'client' },
    { src: '~/plugins/vue-toast-notification.js', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-fontawesome'
  ],
  //settings for modules.@nuxtjs/style-resources
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  //settings for modules.nuxt-fontawesome
  fontawesome: {
    component: 'fa',
    imports: [
      // import whole set
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  render: {
    csp: {
      reportOnly: false,
      // Note: the following is the default directives from helmet:
      // `helmet.contentSecurityPolicy.getDefaultDirectives()`
      policies: {
        'default-src': ['\'self\''],
        'base-uri': ['\'self\''],
        'block-all-mixed-content': [],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'frame-ancestors': ['\'self\''],
        'img-src': ['\'self\'', 'data:'],
        'object-src': ['\'none\''],
        'script-src': ['\'self\''],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'upgrade-insecure-requests': []
      }
    }
  }
};
