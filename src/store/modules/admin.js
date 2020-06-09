import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  users: [],
  user: null,
  qr: null,
  error: null,
  loading: false,
  pass:null,
  pagination: {},
  filter:{} ,
  info:null
}

// getters
const getters = {}

// actions
const actions = {
  clearState ({ commit }) {
    commit('setLoading', false)
    commit('setError', null)
  },
  getInfo ({ commit }) {
    commit('setLoading', true)
    return axios
      .get(constants.baseUrl + 'info')
      .then(response => {
        // eslint-disable-next-line no-console
        console.log('get info')
         // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setInfo', response.data)
        
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  getUser ({ commit }, id) {
    commit('setLoading', true)
    return axios
      .get(constants.baseUrl + 'users/' + id)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setUser', response.data)
        
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
  getAllUser ({ commit, state },filterdata) {
    // eslint-disable-next-line no-console
    console.log('api filter data')
    // eslint-disable-next-line no-console
    console.log(filterdata)
    var filter = '';
    if(filterdata.query){
      if(filterdata.query.query){
        filter += '&$or[0][name][$search]=' + filterdata.query.query;
        filter += '&$or[1][correlationId][$search]=' + filterdata.query.query;
      }
      if(filterdata.query.start){
        filter += '&createdAt[$gte]=' + filterdata.query.start;
      }

      if(filterdata.query.end){
        filter += '&createdAt[$lt]=' + filterdata.query.end;
      }
    }

    if(filterdata.pagination){
      if(filterdata.pagination.skip){
        filter += '&$skip=' + filterdata.pagination.skip
      }
      if(filterdata.pagination.limit) {
        filter += '&$limit=' + filterdata.pagination.limit
      }
      if(filterdata.pagination.sortby && filterdata.pagination.sortby.length > 0){
        filter += '&$sort['+ filterdata.pagination.sortby+ ']'
        // eslint-disable-next-line no-console
      console.log('pagination.sortdesc' + filterdata.pagination.sortdesc)
        if(filterdata.pagination.sortdesc == 'true'){
          filter += '=-1'
        }
 
       
      }
    }

    filter = filter.length > 0 ? '?' + filter : ''
    
    // eslint-disable-next-line no-console
    console.log(filter)
    if(!state.loading) {
      commit('setLoading', true)
      axios
        .get(constants.baseUrl + 'users' + filter)
        .then(response => {
          // eslint-disable-next-line no-console
          console.log(response.data)
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

  createUser ({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .post(constants.baseUrl + 'users',payload)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        //commit('setVerifyResult', response.data)
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  updateUser ({ commit }, payload) {
    commit('setLoading', true)
    // eslint-disable-next-line no-console
    console.log(payload)
    return axios
      .patch(constants.baseUrl + 'users/' + payload.id,payload)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        //commit('setVerifyResult', response.data)
      })
      .catch(error => {
        commit('setError', error)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  deleteUser ({ commit }, id) {
    commit('setLoading', true)

    return axios
      .delete(constants.baseUrl + 'users/' + id)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        //commit('setVerifyResult', response.data)
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
setVerifyResult (state, pass) {
        state.pass = pass
      },
      setMailResult (state, val) {
        state.mailResult = val
      },
  setUsers (state, users) {
    state.users = users
  },
  setPagination (state, val) {
    state.pagination = val
  },
  setFilter (state, val) {
    state.filter = val
  },
  setUser (state, user) {
    state.user = user
  },
  setInfo (state, val) {
    state.info = val
  },
  setQr (state, qr) {
    state.qr = qr
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
