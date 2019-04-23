import Vue from 'vue'
import Vuex from  'vuex'
Vue.use(Vuex)

const state={
    count: null,
}

const getters = {
    newcount(state) {
        return state.count
    }
}

const mutations={//tb
    setCount(state,mycount) {
        state.count = mycount
    },
    getCount(state,mycount2) {
        state.count = mycount2
    }
}

const actions =  {//yb
    setCount({commit}, mycount) {
        commit("setCount", mycount)
    },
    getCount({commit}, mycount2) {
        commit("getCount", mycount2)
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})