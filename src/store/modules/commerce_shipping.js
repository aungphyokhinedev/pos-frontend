import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  items: [],
  error: null,
  success:null,
  loading: false,
  pagination: {},
  filter:{} ,
}

// getters
const getters = {}

// actions
const actions = {
  clearState({ commit }) {
    commit('setLoading', false)
    commit('setError', null)
    commit('setSuccess', null)
  },
  getItem ({ commit }, id) {
    commit('setLoading', true)
    return axios
    .post(constants.baseUrl + 'commerce/shipping/' + id)
      .then(response => {
        commit('setItem', response.data)
        return true;
        
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  setPagination ({commit}, pagination) {
    commit('setPagination', pagination)
  },
  setFilter ({commit}, filter) {
    commit('setFilter', filter)
  },
  getItems ({ commit, state }, qurey) {
  
    // eslint-disable-next-line no-console
    console.log(qurey)
    if(!state.loading) {
      commit('setLoading', true)
      axios
        .post(constants.baseUrl + 'commerce/shipping/list',qurey)
        .then(response => {
          commit('setItems', response.data)
            return true;
          
        })
        .catch(error => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
   
  },
  
  createItem ({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .post(constants.baseUrl + 'commerce/shipping',payload)
      .then(() => {
        commit('setSuccess', 'Create item success')
          return true;
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  updateItem ({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .put(constants.baseUrl + 'commerce/shipping/' + payload._id,payload)
      .then(() => {
        commit('setSuccess', 'Update item success')
        return true;
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  deleteItem ({ commit }, id) {
    commit('setLoading', true)

    return axios
      .delete(constants.baseUrl + 'commerce/shipping/' + id)
      .then(() => {
        commit('setSuccess', 'Delete item success')
        return true;
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  }
}

// mutations
const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setPagination (state, val) {
    state.pagination = val
  },
  setFilter (state, val) {
    state.filter = val
  },
  setLoading (state, load) {
    state.loading = load
  },
  setError (state, err) {
    state.error = err
  },
  setSuccess(state, msg) {
    state.success = msg
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
