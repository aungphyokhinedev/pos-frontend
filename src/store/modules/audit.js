import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  items:[],
  error: null,
  loading: false,
  pagination: {}
}

// getters
const getters = {}

// actions
const actions = {
  clearState ({ commit }) {
    commit('setLoading', false)
    commit('setError', null)
  },
  setPagination ({commit}, pagination) {
    commit('setPagination', pagination)
  },
  getItems ({ commit }, filterdata) {
    var filter = '';
    if(filterdata.query){
      if(filterdata.query.query){
        filter += '&email=' + filterdata.query.query;
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

    commit('setLoading', true)
    axios
      .get(constants.baseUrl + 'auditlog' + filter)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setItems', response.data)
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
  setItems (state, val) {
    state.items = val
  },
  setPagination (state, val) {
    state.pagination = val
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
