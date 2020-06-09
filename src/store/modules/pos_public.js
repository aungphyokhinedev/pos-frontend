import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
    noties:[],
    account: null,
    customer: null,
    store: {},
    error: null,
    success: null,
    result:null,
    loading: false,
    
}

// getters
const getters = {
    getCollection: (state) => (collection) => {
        return state.store[collection]
    }
}

// actions
const actions = {
    clearAll({commit}){
        commit('removeNotie',null)
        commit('setCustomer', null)
        commit('setAccount', null)
        commit('setResult', null)
        commit('setLoading', false)
        commit('setError', null)
        commit('setSuccess', null)
        commit('clearItems')
    },
    removeNotie({commit},params) {
        commit('removeNotie',params)
    },
    clearUser({commit}) {
        commit('setCustomer', null)
        commit('setAccount', null)
        commit('setResult', null)
       
    },
    clearState({ commit }) {
        commit('setLoading', false)
        commit('setError', null)
        commit('setSuccess', null)
        
    },
    setItems({commit},params){
        commit('setItems', {data:params.data,collection:params.collection})
    },
    clearItems({commit}){
        commit('clearItems')
    },
    getAccount({ commit }) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/account')
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
    getCustomer({ commit }) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/public/Customer')
            .then(response => {
                commit('setCustomer', response.data)
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    addCustomer({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/public/add/Customer',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Adding Customer information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    updateCustomer({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/public/update/Customer',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Updating Customer information done.")
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
            .post(constants.baseUrl + 'pos/public/get/item',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
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
            .post(constants.baseUrl + 'pos/public/items',params)
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
    findItems({ commit },params) {
     
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/find/items',params)
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
    orderItems({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/order/items',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Adding order information done.")
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
            .post(constants.baseUrl + 'pos/public/add/item',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
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
            .post(constants.baseUrl + 'pos/public/update/item',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
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
            .post(constants.baseUrl + 'pos/public/map/items',params)
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
    rateInfo({ commit },params) {
        commit('setLoading', true)
      
        return axios
            .post(constants.baseUrl + 'pos/public/total/rank',params)
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
    addReview({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/add/review',params)
            .then(response => {
                if(params.nocache) {
                    return response.data;
                }
                commit('setResult', response.data)
                commit('setSuccess', "Adding review information done.")
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    orderCancel({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/order/cancel',params)
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

    setFavourite({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/public/set/favourite',params)
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
    claimInvoice({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/public/claim/invoice',params)
            .then(response => {
                return  response.data;
            })
            .catch(error => {
                commit('setError', error)
                return false;
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
}

// mutations
const mutations = {
    clearNoties(state) {
        state.noties = []
    },
    removeNotie(state, id){
     
        const _index = state.noties.findIndex(_item=>_item.id == id)
        if(_index > -1){
            state.noties.splice(_index,1)      
        }
    },
    setNoties(state, noties) {
        state.noties = noties
    },

    addNotie(state, noti) {
        const _index = state.noties.findIndex(_item=>_item.id == noti.id)
        if(_index > -1){
            state.noties.splice(_index,1)      
        }
        state.noties.push(noti) 
    },
    setAccount(state, account) {
        state.account = account
    },
    setCustomer(state, Customer) {
        
        state.customer = Customer
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
