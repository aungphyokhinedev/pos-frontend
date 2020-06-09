import axios from '../../common/posaxios'
import constants from '../../common/constants'
// initial state
const state = {
    error: null,
    success: null,
    result:null,
    loading: false,
    data: null,
    histories:[]
}


// getters
const getters = {
    token: state => {
        return state.data ? state.data.token : null
    }
}

// actions
const actions = {
    clearState({ commit }) {
        commit('clear')
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
    sendResetCode({ commit },params) {
        commit('setLoading', true)
        return axios
            .post(constants.baseUrl + 'pos/front/user/resetpassword',params)
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
            .post(constants.baseUrl + "pos/front/user/login",{
                code:params.code,
                name:params.name,
                password:params.password
            })
            .then(response => {
                commit('setData',  {...response.data, 
                    token:response.headers.accesstoken,
                })
                if(params.remember){
                    commit('setHistory',  {
                        _id: response.data._id,
                        photo:response.data.photo,
                        title:response.data.fullName,
                        subtitle:params.name,
                        ...params})
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
    setData(state, params) {
        state.data = params
    },
    removeData(state){
        state.data = null
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

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
