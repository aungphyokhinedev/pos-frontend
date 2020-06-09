import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
    user: null,
    customer: null,
    shop: null,
    store: {},
    cartItems:[],
    savedItems: [],
    currentItem: null,
    error: null,
    success: null,
    result:null,
    loading: false,
    transactionMenu: null,
    invoiceSetup:null
}

// getters
const getters = {
    getCollection: (state) => (collection) => {
        return state.store[collection]
    }
}

// actions
const actions = {
    clearUser({commit}) {
        commit('setUser', null)
        commit('setShop', null)
        commit('setResult', null)
    },
    clearCustomer({commit}) {
        commit('setCustomer', null)
    },
    clearState({ commit }) {
        commit('setLoading', false)
        commit('setError', null)
        commit('setSuccess', null)
        
    },
    setTransactionMenu({commit}, params){
        commit('setTransactionMenu', params)
    },
    setSavedItems({commit},item){
        commit('setSavedItems',item)
    },
    clearSavedItems({commit}){
        commit('clearSavedItems')
    },
    addSavedItem({commit},item){
        commit('addSavedItem',item)
    },
    removeSavedItem({commit},item){
        commit('removeSavedItem',item)
    },
    clearCartItems({commit}){
        commit('clearCartItems')
    },
    addCartItem({commit},item){
        commit('addCartItem',item)
    },
    removeCartItem({commit},item){
        commit('removeCartItem',item)
    },
    clearItems({commit}){
        commit('clearItems')
    },
    getUser({ commit }) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/front/user')
            .then(response => {
                commit('setUser', response.data)
                return true;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    getCustomer({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/get/customer',params)
            .then(response => {
                if(params.nocache){
                    return response.data
                }
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
    getShop({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/get/shop',params)
            .then(response => {
                commit('setShop', response.data)
             
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
            .post(constants.baseUrl + 'pos/front/user/items',params)
            .then(response => {
                if(params.nocache){
                    return response.data
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
   
    getItemByCode({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/items',params)
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
    sale({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/sale',params)
            .then(response => {
                commit('setResult', response.data)
                commit('setSuccess', "Adding Sale information done.")
                return response.data;


            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    changePassword({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/changepassword',params)
            .then((response) => {
                return {
                    success:true,
                    message: response.data
                }
            })
            .catch(error => {
                return {
                    success:false,
                    message: error
                }
             })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    updateUser({commit}, params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/update',params)
            .then((response) => {
                return {
                    success:true,
                    message: response.data
                }
            })
            .catch(error => {
                return {
                    success:false,
                    message: error
                }
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    orderProcess({commit}, params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/order/process',params)
            .then((response) => {
                return {
                    success:true,
                    message: response.data
                }
            })
            .catch(error => {
                return {
                    success:false,
                    message: error
                }
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    getCurrentItem({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/get/item',params)
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
    updateItem({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/front/update/item',params)
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

    addOrderInfo({ commit },params) {
        commit('setLoading', true)
       
        return axios
            .post(constants.baseUrl + 'pos/front/add/order/info',params)
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
    getInvoiceSetup({ commit },params) {
        commit('setLoading', true)
        params.collection = "posinvoicesetup"
        params.query = {$or:[{shop:params.shop},{shop:null}]}
        return axios
            .post(constants.baseUrl + 'pos/front/user/items',params)
            .then(response => {
                if(params.nocache){
                    return response.data.rows
                }
                if(response.data.rows && response.data.rows.length > 0){
                    if(response.data.rows.length == 1){
                        commit('setInvoiceSetup', response.data.rows[0])
                    }
                    else{
                        const _setup = response.data.rows.filter(item=>item.shop == params.shop)
                        commit('setInvoiceSetup', _setup[0])
                    }
                }
                else{
                    commit('setInvoiceSetup', null)
                }
                
                return true;

            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    getInvoice({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/get/invoice',params)
            .then(response => {
                return response.data
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
    setTransactionMenu(state,params){
        state.transactionMenu = params
    },
    setUser(state, user) {
        state.user = user
    },
    setCustomer(state, customer) {
        state.customer = customer
    },
    setShop(state, shop) {
        
        state.shop = shop
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
    setSavedItems(state, item) {
        const _index = state.savedItems.findIndex(_item=>_item.time == item.time)
        state.cartItems = item.items
        state.savedItems.splice(_index,1)
        
    },
    clearCartItems(state) {
        state.cartItems = []
    },
    addCartItem(state, item) {
        const _index = state.cartItems.findIndex(_item=>_item._id == item._id)
        let _newItem = {...state.cartItems[_index]}
        //state.cartItems.splice(_index,1)
        ///for updating check updateFlag
        if(item.updateFlag){
            _newItem.qty = parseInt(item.qty)
            _newItem.amount = parseInt(item.amount)
            _newItem.updateFlag = null
            state.cartItems[_index] = _newItem
            state.cartItems = [...state.cartItems]
            return
        }
        
        if(_index < 0) {
            state.cartItems.push(item)
        }
        else{
            _newItem.qty += parseInt(item.qty)
            _newItem.amount += parseInt(item.amount)
            state.cartItems[_index] = _newItem
            state.cartItems = [...state.cartItems]
            
            
        }
       
        
    },
    removeCartItem(state, item) {
        const _index = state.cartItems.findIndex(_item=>_item._id == item._id)
        state.cartItems.splice(_index,1)
    },

    clearSavedItems(state) {
        state.savedItems = []
    },
    addSavedItem(state, items) { 
        state.savedItems.push({
            time: Date.now(),
            items: items
        })    
    },
    removeSavedItem(state, item) {
        const _index = state.savedItems.findIndex(_item=>_item._id == item._id)
        state.savedItems.splice(_index,1)
    },
    setInvoiceSetup(state, setup) {
        state.invoiceSetup = setup
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
