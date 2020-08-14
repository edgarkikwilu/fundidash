import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        isAuth:false,
        access_token:''
    },
    mutations:{
        change(state,isAuth){
            state.isAuth = isAuth
            console.log('inside vuex')
            console.log(isAuth)
            console.log('-____----_____--')
        },
        updateAccessToken(state,access_token){
            state.access_token = access_token
        }
    },
    getters:{
        isAuth: state =>state.isAuth,
        access_token: state =>state.access_token
    }
})

// export default {state,getters}