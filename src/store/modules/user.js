import {supabase} from "@/services/APIauthorization";

async function setDataInformationUser(object){
    try {
        if (object){
            const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
            const obj = {
                "id": Number(randomID()),
                "user_id": String(object.id),
                "login_user": String(object.login),
                "first_user_name": String(object.first_name),
                "last_user_name": String(object.last_name),
                "email_user": String(object.email),
                "number_phone_user": String(object.number_phone),
                "cart_bank_user": String(object.cart_bank)
            }
            let {error} = await supabase.from('information_user')
                .insert([obj]).select()
            //if (error) throw error
        }else {
            console.log('Ошибка данных о пользователе')
        }
    }catch (e){
        Promise.reject(e)
    }
}

export default {
    namespaced: true,
    state:{
        auth: false,
        user: {
            id: null,
            user_id: 0,
            user_login: null,
            user_first_name: null,
            user_last_name: null,
            user_email: null,
            user_number_phone: null,
            user_cart_bunk_number: null
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
                commit("GET_USER_LOGIN", result.data.user.user_metadata.first_name)
                commit("GET_USER_EMAIL", result.data.user.email)
            }
            catch (e){
                Promise.reject(e)
            }
        },
        async setUserData({commit}, data){
            try {
                if (data){
                    await setDataInformationUser(data)
                    commit("UPDATE_USER_INFO", data)
                }

            }catch (e){
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
        GET_USER_LOGIN(state, login){
            state.user.user_login = login
        },
        GET_USER_EMAIL(state, email){
            state.user.user_email = email
        },
        UPDATE_USER_INFO(state, data){
            state.user.user_id = data.id
            state.user.user_login = data.login
            state.user.user_first_name = data.first_name
            state.user.user_last_name = data.last_name
            state.user.user_email = data.email
            state.user.user_number_phone = data.number_phone
            state.user.user_cart_bunk_number = data.cart_bank
            console.log(state.user)
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
}