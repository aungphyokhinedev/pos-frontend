import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  users: [],
  error: null,
  success: null,
  loading: false,
  pagination: {},
  filter: {},
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
  getUser({ commit }, id) {
    commit('setLoading', true)
    return axios
      .post(constants.baseUrl + 'auth/' + id)
      .then(response => {

        commit('setUser', response.data)


      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  setPagination({ commit }, pagination) {
    commit('setPagination', pagination)
  },
  setFilter({ commit }, filter) {
    commit('setFilter', filter)
  },
  getUsers({ commit, state }, qurey) {

    // eslint-disable-next-line no-console
    console.log(qurey)
    if (!state.loading) {
      commit('setLoading', true)
      axios
        .post(constants.baseUrl + 'auth/list', qurey)
        .then(response => {
          commit('setUsers', response.data)

        })
        .catch(error => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }

  },
  createInternalUser({ commit }, payload) {
    commit('setLoading', true)
    if (payload.password != payload.confirmPassword) {
      commit('setError', { response: { data: { message: 'Password does not match' } } })
      commit('setLoading', false)
      return Promise.reject()
    }
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .post(constants.baseUrl + 'auth/internal/register', payload)
      .then(() => {

        commit('setSuccess', 'Creating user success')
          return true;
        //commit('setVerifyResult', response.data)
      })
      .catch(error => {
        commit('setError', error)
        return false;
      })
      .finally(() => {
        commit('setLoading', false)
        return false;
      })
  },
  createUser({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .post(constants.baseUrl + 'auth/register', payload)
      .then(() => {
        commit('setSuccess', 'Creating user success')
          return true;
      })
      .catch(error => {
      
        commit('setError', error)
        return false;
      })
      .finally(() => {
        commit('setLoading', false)
        return false;
      })
  },
  updateUser({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .put(constants.baseUrl + 'auth/' + payload._id, payload)
      .then(() => {
        commit('setSuccess', 'Updating user success')
          return true;
      })
      .catch(error => {
        commit('setError', error)
        return false;
      })
      .finally(() => {
        commit('setLoading', false)
        return false;
      })
  },
  deleteUser({ commit }, id) {
    commit('setLoading', true)

    return axios
      .delete(constants.baseUrl + 'auth/' + id)
      .then(() => {
        commit('setSuccess', 'Delete user success')
          return true;
      })
      .catch(error => {
        commit('setError', error)
        return false;
      })
      .finally(() => {
        commit('setLoading', false)
        return false;
      })
  }
}

// mutations
const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setPagination(state, val) {
    state.pagination = val
  },
  setFilter(state, val) {
    state.filter = val
  },
  setLoading(state, load) {
    state.loading = load
  },
  setSuccess(state, msg) {
    state.success = msg
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
