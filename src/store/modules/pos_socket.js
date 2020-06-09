import axios from '../../common/myaxios'
import constants from '../../common/constants'
import mysocket from '../../common/mysocket'

// initial state
const state = {
    events: [],
    items: [],
    error: null,
    success: null,
    loading: false,
    pagination: {},
    filter: {},
    currentEvent: null
}

// getters
const getters = {}
let socket = null;
// actions
const actions = {
    clearState({ commit }) {
        commit('setLoading', false)
        commit('setError', null)
        commit('setSuccess', null)

    },
    list({ commit }) {
        socket.emit("call",'list', { room : "room1" },
        function (err, res) {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err)
                commit('setError', err)
            } else {
                // eslint-disable-next-line no-console
                console.log(res)
                commit('setSuccess', res)
            }
        })
    },
    join({ commit },room) {
        socket.emit("call",'join', { room },
        function (err, res) {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err)
                commit('setError', err)
            } else {
                // eslint-disable-next-line no-console
                console.log(res)
                commit('setSuccess', res)
            }
        })
    },
    leave({ commit },room) {
        socket.emit("call",'leave', { room },
        function (err, res) {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err)
                commit('setError', err)
            } else {
                // eslint-disable-next-line no-console
                console.log(res)
                commit('setSuccess', res)
            }
        })
    },
    echo({ commit },payload){
        commit('setLoading', true)
        // eslint-disable-next-line no-console
        console.log(payload)
        return axios
        .post(constants.baseUrl + 'socket/echo',payload)
        .then(() => {
            commit('setSuccess', 'Send data success')
            return true;
        }) 
        .catch(error => {
            commit('setError', error)  
        })
        .finally(() => {
            commit('setLoading', false)
        })
    },
    clear({commit}) {
        commit('clearItems')
    },
    on({ commit },event) {
     
        socket.on(event, function (data) {
            commit('setCurrentEvent', {
                event,
                data,
                date: Date.now()
            })
        });
        commit('addEvent', event);
    },
   
    off({ commit },event) {
        socket.off(event);
        commit('removeEvent', event);
    },
    init({ commit }) {
        socket = mysocket();

        socket.emit("call",'socket', { message: "connected" },
        function (err, res) {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err)
                commit('setError', err)
            } else {
                // eslint-disable-next-line no-console
                console.log(res)
                commit('setSuccess', res)
            }
        })

        
    },
}

// mutations
const mutations = {
    addEvent(state, val) {
        const _index = state.events.findIndex(_item=>_item == val)
        if(_index == -1){
            state.events.push(val)  
        }
    },
    removeEvent(state, val) {
        const _index = state.events.findIndex(_item=>_item == val)
        if(_index > -1){
            state.events.splice(_index,1)      
        }
    },
    clearEvents(state) {
        state.events = []
    },
    addItem(state, val) {
        state.items.push(val)
    },
    clearItems(state) {
        state.items = []
    },
    setPagination(state, val) {
        state.pagination = val
    },
    setFilter(state, val) {
        state.filter = val
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
    setCurrentEvent(state, data) {
        state.currentEvent = data
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
