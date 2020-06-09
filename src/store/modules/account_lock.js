import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  getdata: null,
  checkdata: null,
  error: null,
  success:null,
  loading: false
}

// getters
const getters = {}

// actions
const actions = {
  clearState({ commit }) {
    commit('setLoading', false)
    commit('setError', null)
    commit('setSuccess', null)
    commit('setGetData', null)
    commit('setCheckData', null)
  },
  getLock ({ commit }, payload) {
  
   
      commit('setLoading', true)
    return  axios
        .post(constants.baseUrl + 'account/lock/get',payload)
        .then(response => {
          commit('setGetData', response.data)
            return true;
        })
        .catch(error => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    
   
  },
  checkLock ({ commit }, payload) {
  
  
      commit('setLoading', true)
      return  axios
        .post(constants.baseUrl + 'account/lock/check',payload)
        .then(response => {
          commit('setCheckData', response.data)
            return true;
          
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
    setGetData (state, val) {
    state.getdata = val
  },
  setCheckData (state, val) {
    state.checkdata = val
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
