import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
    account: null,
    owner: null,
    store: {},
    currentItem: null,
    error: null,
    success: null,
    result:null,
    loading: false,
    homeMenu: null
}

// getters
const getters = {}

// actions
const actions = {
    clearUser({commit}) {
        commit('setOwner', null)
        commit('setAccount', null)
        commit('setResult', null)
    },
    clearState({ commit }) {
        commit('setLoading', false)
        commit('setError', null)
        commit('setSuccess', null)
        
    },
    clearItems({commit}){
        commit('clearItems')
    },
    setHomeMenu({commit}, params){
        commit('setHomeMenu', params)
    },
    getAccount({ commit }) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/account')
            .then(response => {
                commit('setAccount', response.data)
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    getOwner({ commit }) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/admin/owner')
            .then(response => {
                commit('setOwner', response.data)
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    addOwner({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/admin/add/owner',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Adding owner information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    updateOwner({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/admin/update/owner',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Updating owner information done.")
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
          }}).then(response => {
            commit('setSuccess', 'Upload file success')
            return response.data;
          })
          .catch(error => {
            commit('setError', error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      },
      getCurrentItem({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/get/item',params)
            .then(response => {
                commit('setCurrentItem', response.data)
             
                return true;

            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
      getItems({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/items',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
                commit('setItems', {data:response.data,collection:params.collection})
                return true;
              

            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    addItem({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/add/item',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Adding "+params.collection+" information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    updateItem({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/admin/update/item',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Updating "+params.collection+" information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    mapItems({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/admin/map/items',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Updating "+params.collection+" information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    saleSummary({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/summary/sale',params)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    saleDetailSummary({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/summary/saledetail',params)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    orderSummary({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/summary/order',params)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    findItems({ commit },params) {
     
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/find/items',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
               
                commit('setItems', {data:response.data,collection:params.collection})
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
    setHomeMenu(state, params){
        state.homeMenu = params
    },
    setAccount(state, account) {
        state.account = account
    },
    setOwner(state, owner) {
        
        state.owner = owner
    },
    setLoading(state, load) {
        state.loading = load
    },
    setError(state, err) {
        state.error = err
    },
    setSuccess(state, msg) {
        state.success = msg
    },
    setResult(state, msg) {
        state.result = msg
    },
    setCurrentItem(state, item) {
        state.currentItem = item
    },
    clearCurrentItem(state) {
        state.currentItem = null
    },
    setItems(state, params) {
        let _newstore = {...state.store}
        _newstore[params.collection] = params.data
        state.store = _newstore
    },
    clearItems(state) {
        state.store = {}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
