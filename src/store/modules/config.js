import fs from 'fs'
import path from 'path'

const state = {
    config: null,
    userInfo: null
}

const mutations = {
    SET_CONFIG (state, opts){
        state.config = opts
    },

    SET_USER_INFO( state, info){
        state.userInfo = info
    },

    DESTROY (state){
        state.userInfo = null

        // //清空data数据库
        // if( fs.existsSync(path.join(state.config.DB_PATH, 'op-record.db'))){
        //     fs.unlink( path.join(state.config.DB_PATH, 'op-record.db') )
        // }
        // if( fs.existsSync(path.join(state.config.DB_PATH, 'usertmp.db'))){
        //     fs.unlink( path.join(state.config.DB_PATH, 'usertmp.db') )
        // }
    }
}

const actions = {
    SET_CONFIG ({ commit }, opts) {
        commit('SET_CONFIG', opts)
    },

    SET_USER_INFO ({ commit }, info) {
        commit('SET_USER_INFO', info)
    },

    DESTROY({ commit }) {
        commit('DESTROY')
    }
}

const getters = {
    config: state => {
        return state.config
    },

    userInfo: state => {
        return state.userInfo
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
