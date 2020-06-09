import axios from '../../common/myaxios'
import constants from '../../common/constants'
import { resetState } from '../../store'
// initial state
const state = {
  searching: false,
  adding: false,
  isLoggedIn: false,
  token: null,
  error: null,
  loading: false,
  user: null,
  filter: {}
}

// getters
const getters = {
  authToken: state => {
    return state.token
  }
}

// actions
const actions = {
  setFilter({ commit }, val) {
    // eslint-disable-next-line no-console
    console.log(val)
    commit('setFilter', val)
  },
  setSearch({ commit }, val) {
    commit('setSearching', val)
  },
  setAdd({ commit }, val) {
    commit('setAdding', val)
  },
  login({ commit }, payload) {
    commit('setLoading', true)

    axios({ method: 'post', url: constants.baseUrl + 'auth/login', data: payload })
      //.post(constants.baseUrl + 'api/auth/login',payload)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
        commit('setLogin', response.headers.accesstoken)
        commit('setUser', response.data)


      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  // eslint-disable-next-line no-unused-vars
  logout({ commit }) {
    resetState();
    commit('setLogout')
  },
}

// mutations
const mutations = {
  setFilter(state, val) {
    state.filter = val
  },
  setLogout(state) {
    state.isLoggedIn = false
    state.token = null
  },
  setLogin(state, val) {
    state.isLoggedIn = true
    state.token = val
  },
  setUser(state, val) {
    state.user = val
  },
  setSearching(state, val) {
    state.searching = val
  },
  setAdding(state, val) {
    state.adding = val
  },
  setLoading(state, load) {
    state.loading = load
  },
  setError(state, err) {
    state.error = err
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
