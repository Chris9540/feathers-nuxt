import Vue from 'vue';
import Vuex from 'vuex';
import { FeathersVuex } from '../feathers-client';
import auth from './store.auth';
Vue.use(Vuex);
Vue.use(FeathersVuex);
import { initAuth } from 'feathers-vuex'
import consola from 'consola';
const logger = consola.withScope('store');

const reAuthenticate = async (payload, dispatch) => {
  if (payload) {
    logger.info(`Reauthenticating user ${payload.sub}`);
    const response = await dispatch('auth/authenticate');

    logger.debug('[auth] token', response.accessToken);
    logger.info(`Successfully reauthenticated ${payload.sub}`);

    return response;
  }

  return payload;
};

const requireModule = require.context(
  './services',
  false,
  /\.js$/
);
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

export default () =>
  new Vuex.Store({
    state: {
      page: {
        name: 'Home',
        route: '/'
      }
    },
    mutations: {
      setPage (state, page) {
        state.page = page
      }
    },
    actions: {
      nuxtServerInit ({ commit, dispatch }, { req }) {
        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })
      },
      async nuxtClientInit ({ commit, dispatch, state }) {
        if (!state.auth) {
          return;
        }
        
        let { payload } = state.auth;
        if (!payload && document.cookie) {
          payload = await initAuth({
            commit,
            req: {
              headers: {
                cookie: document.cookie
              }
            },
            cookieName: 'feathers-jwt'
          });
        }
        return reAuthenticate(payload, dispatch);
      }
    },
    plugins: [  ,...servicePlugins, auth]
  });
