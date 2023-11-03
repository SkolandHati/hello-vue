import {supabase} from "@/services/APIauthorization";

export default {
    namespaced: true,
    state:{
        auth: false,
        user: {
            user_id: 0,
            user_name: null
        }
    },
    actions: {
        async getUser({commit}){
            try {
                const result = await supabase.auth.getUser()
                if (result.data.user === null){
                    return commit("GET_USER", false, result.data.user)
                }
                commit("GET_USER_STATUS", result.data.user.aud)
                commit("GET_USER_ID", result.data.user.id)
                commit("GET_USER_NAME", result.data.user.user_metadata.first_name)
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
        GET_USER_STATUS(state, auth){
            state.auth = auth
        },
        GET_USER_ID(state, id){
            state.user.user_id = id
        },
        GET_USER_NAME(state, name){
            state.user.user_name = name
        }
    },
    getters: {
        AUTH(state){
          return state.auth
        },
        USERINSYSTEM(state){
            return state.user
        }
    }
    // strict: process.env.NODE_ENV !== 'production'
}