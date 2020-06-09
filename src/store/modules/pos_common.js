
// initial state
const state = {
    settings: {
       glassBorder: true,
       saleSliderEnable: true,
       theme:'light'
    }
}

// getters
const getters = {
}

// actions
const actions = {
    setSettings({commit},params){
        commit('setSettings',params)
    },

}

// mutations
const mutations = {
    setSettings(state,params){
        state.settings[params.name] = params.value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
