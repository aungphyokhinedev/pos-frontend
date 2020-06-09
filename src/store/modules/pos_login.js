import axios from '../../common/posaxios'
import constants from '../../common/constants'
// initial state
const state = {
    type:null,
    error: null,
    success: null,
    result:null,
    loading: false,
    data: null,
    histories:[],
    returnUrl:null
}


// getters
const getters = {
    token: state => {
        return state.data ? state.data.token : null
    },
    type: state => {
        return state.type ? state.type : null
    },
    login: state => {
        return state.data
    }
}


// actions
const actions = {
    clearState({ commit }) {
        commit('clear')
    },
    setType({commit},type) {
        commit('setType',type)
    },
    setReturnUrl({commit},params) {
        commit('setReturnUrl',params)
    },
    logout({commit}) {
        commit('removeData')
    },
    removeHistory({commit}, params) {
    
        commit('removeHistory',params)
    },
    clear({ commit }) {
        commit('clear')
    },
    register({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'auth/register',params)
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
    sendResetCode({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'auth/reset/send',params)
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
    resetPassword({ commit },params) {
        commit('setLoading', true)
        return axios
            .put(constants.baseUrl + 'auth/reset/password',params)
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
    updateAccount({commit}, params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/admin/update/account',params)
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
    changePassword({ commit },params) {
        commit('setLoading', true)
        return axios
            .put(constants.baseUrl + 'auth/change/password',params)
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
    login({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + "auth/login",{
              email:params.email,
                password:params.password,
              
            })
            .then(response => {
              
                commit('setData',  {...response.data, 
                    token:response.headers.accesstoken,
                    loginType: params.loginType
                })
                if(params.remember){
                    commit('setHistory',  {
                      _id: response.data._id,
                      photo:response.data.photo,
                      title:response.data.userName || "Email Login",
                      subtitle:params.email, 
                      ...params})
                }
                //commit('setSuccess', "Login information done.")
                return true;

            })
            .catch(error => {
                commit('setError', error)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    socialLogin({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl  + "auth/social/login",{
              token:params.token,
              provider:params.provider,
              
            })
            .then(response => {
             // eslint-disable-next-line no-console
             console.log("access token",response.headers.accesstoken)
                commit('setData',  {...response.data, 
                    token:response.headers.accesstoken,
                    loginType: params.loginType
                })
                if(params.remember){
                    commit('setHistory',  {
                      _id: response.data._id,
                      photo:response.data.photo,
                      title:response.data.userName || "Email Login",
                      subtitle:params.email, 
                      ...params})
                }
                //commit('setSuccess', "Login information done.")
                return {
                    success:true,
                    message: response.data
                };

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

    socialRegister({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl  + "auth/social/register",{
              token:params.token,
              provider:params.provider,
              
            })
            .then(response => {
                return {
                    success:true,
                    message: response.data
                };

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
    }
}

// mutations
const mutations = {
    removeHistory(state, params) {
     
      
        let _index = 0
        for(var i = 0; i< state.histories.length; i++){
            if(state.histories[i]._id == params._id){
                _index = i
                
            }
        }
       state.histories.splice(_index,1)
        
    },
    setHistory(state, params) {
        const _index = state.histories.findIndex(_item=>_item._id == params._id)
        if(_index > -1){
            state.histories.splice(_index,1)      
        }

        state.histories.push(params) 
 
        
    },
    setType(state, params) {
        state.type = params
    },
    setData(state, params) {
        state.data = params
    },
    removeData(state){
        state.type=null
       state.result = null
        state.data = null
        state.type = null
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
    clear(state) {
        state.error= null
        state.success= null
        state.result=null
        state.loading= false
    },
    setReturnUrl(state, url) {
        state.returnUrl = url
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

