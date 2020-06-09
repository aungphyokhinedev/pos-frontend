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
  getItems ({ commit, state }, qurey) {
  
    // eslint-disable-next-line no-console
    console.log(qurey)
    if(!state.loading) {
      commit('setLoading', true)
      axios
        .post(constants.baseUrl + 'file/list',qurey)
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
  
  deleteItem ({ commit }, id) {
    commit('setLoading', true)

    return axios
      .delete(constants.baseUrl + 'file/' + id)
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
  },
  upload ({ commit },file) {
    commit('setLoading', true)
    let formData = new FormData();
    formData.append('file', file);
    // eslint-disable-next-line no-console
    console.log(file);
    return axios
      .post(constants.baseUrl + 'file/upload',
      formData,
      {
      headers: {
          'Content-Type': 'multipart/form-data'
      }}).then(() => {
        commit('setSuccess', 'Upload file success')
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
