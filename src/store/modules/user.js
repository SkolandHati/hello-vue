import {supabase} from "@/services/APIauthorization";

export default {
    namespaced: true,
    state:{
        auth: false,
        user: null
    },
    action: {
        async getUsers({commit}){
            try {
                const result = await supabase.auth.getUser()
                commit("GET_USER", result.data.user)
            }
            catch (e){
                Promise.reject(e)
            }
        },
        async outUser({commit}){
            try {
                commit("GET_USER", null)
            }catch (e){
                Promise.reject(e)
            }
        },
    },
    mutations:{
        GET_USER(state, user){
            state.user = user
        },
    },
    getters: {
        USERINSYSTEM(state){
            return state.user
        }
    }
    // strict: process.env.NODE_ENV !== 'production'
}