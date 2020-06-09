import axios from '../../common/myaxios'
import constants from '../../common/constants'
// initial state
const state = {
  userInfo:{total:0,
    locked:0,
    blocked:0},
  summaryInfo:{},
  error: null,
  loading: false,
}

// getters
const getters = {}

// actions
const actions = {
  clearState ({ commit }) {
    //commit('setSummaryInfo', null)
    //commit('setUserInfo', null)
    commit('setError', null)
  },
  getUserInfo ({ commit, state }) {
      var info ={
          total:0,
          locked:0,
          blocked:0
      }
      if(!state.loading){
        commit('setLoading', true)


        return axios
        .post(constants.baseUrl + 'auth/list',{
          page:1,
          pageSize:1,
        })
        .then(response => {

          info.total = response.data.total
          return axios
          .post(constants.baseUrl + 'auth/list',{
            page:1,
            pageSize:1,
            query:{blocked:true}
          })
          .then(response => {
  
           
            info.blocked = response.data.total
            return axios
            .post(constants.baseUrl + 'auth/list',{
              page:1,
              pageSize:1,
              query:{locked:true}
            })
            .then(response => {
    
             
              info.locked = response.data.total
               // eslint-disable-next-line no-console
               console.log(info)
              commit('setUserInfo', info)
                
            })
            .catch(error => {
                commit('setError', error)
            })
              
          })
          .catch(error => {
              commit('setError', error)
          })
            
        })
        .catch(error => {
            commit('setError', error)
        })
        .finally(() => {
            
            commit('setLoading', false)
        })
      }
    
  },
  getSummaryInfo ({ commit, state }) {
    var info ={
        total:0,
        fail:0,
        success:0
    }
    if(!state.logLoading){
      commit('setLogLoading', true)
      
       // eslint-disable-next-line no-console
       console.log('get all logs')
      return axios
      .get(constants.baseUrl + 'tokenlog?$limit=1')
      .then(response => {
          info.total = response.data.total
         
           // eslint-disable-next-line no-console
           console.log('get success logs')
          return    axios
      .get(constants.baseUrl + 'tokenlog?$limit=1&valid=1')
      .then(response => {
          info.success = response.data.total
          info.fail = info.total - info.success
          commit('setLogInfo', info)

          
      }).catch(error => {
        commit('setError', error)
    })

          
      })
      .catch(error => {
          commit('setError', error)
      })
      .finally(() => {
          
          commit('setLogLoading', false)
      })
    }
  
},
async getSummary({ commit }) {
  let services = [
    {name:'jwt', latency: 100},
    {name:'crypto', latency: 100},
    {name:'auth', latency: 100},
    {name:'authorization', latency: 100},
  //  {name:'mailer', latency: 100},
  //  {name:'file', latency: 100}
  ]
  for(let service of services){
    let start = Date.now();
    await axios
    .get(constants.baseUrl + service.name +'/test')
    .then(() => {
      service.latency =  (Date.now() - start);
    });
  }

  commit('setSummaryInfo', services)
  
}


}

// mutations
const mutations = {
setUserInfo (state, val) {
    state.userInfo = val
  },
setSummaryInfo (state, val) {
    state.summaryInfo = val
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
