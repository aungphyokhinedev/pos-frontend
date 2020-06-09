import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  result: null,
  error: null,
  loading: false,
}

// getters
const getters = {}

// actions
const actions = {
  clearState ({ commit }) {
    commit('setLoading', false)
    commit('setError', null)
  },
 
  check ({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .post(constants.baseUrl + 'authorization/access',payload)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setCheckResult', response.data)
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
 
}

// mutations
const mutations = {
  setCheckResult (state, val) {
    state.result = val
  },
  setLoading (state, load) {
    state.loading = load
  },
  setError (state, err) {
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
