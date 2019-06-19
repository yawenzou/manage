import * as type from './type.js'

//initial state
const state = {
    step: 0,
    equipmentInfo: {},
    versionsInfo: {},
    defaultSetting: {}
}

//getters
const getters = {
    [type.GET_EQUINMENT_INFO]: state => {
        return state.equipmentInfo
    },
    [type.GET_VERSIONS_INFO]: state => {
        return state.versionsInfo
    },
    [type.GET_DEFAULT_SETTING]: state => {
        return state.defaultSetting
    },
    // step: state => state.step
}

const actions = {
    // setStep({commit}, newStep) {
    //     commit('setStep', newStep)
    // }
}

const mutations = {
    [type.SET_STEP](state, newStep) {
        state.step = newStep
    },
    [type.NEXT_STEP](state) {
        state.step++
    },
    [type.PREV_STEP](state) {
        state.step--
    },
    [type.SET_EQUINMENT_INFO](state, newStep) {
        state.equipmentInfo = newStep || {}
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}