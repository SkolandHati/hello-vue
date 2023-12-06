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
            if (error) throw error
        }else {
            console.log('Ошибка данных о пользователе')
        }
    }catch (e){
        console.log(e)
    }
}
async function updateUserData(){
    try {
        let dataUser = await supabase.auth.getUser()
        if (dataUser){
            const {data, error} = await supabase.from('information_user').select('*').eq('user_id', dataUser.data.user.id)
            return data
        }else {
            return null
        }
    }catch (e){
        console.log(e)
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
        async getUser({dispatch, commit}){
            try {
                const result = await supabase.auth.getUser()
                const data = await updateUserData()
                if (!!data.length){
                    dispatch('updateUserInfo')
                    if (result.data.user === null){
                        commit("GET_USER", false, result.data.user)
                    }
                    commit("GET_USER_STATUS", result.data.user.aud)
                }else {
                    if (result.data.user === null){
                        commit("GET_USER", false, result.data.user)
                    }
                    commit("GET_USER_STATUS", result.data.user.aud)
                    commit("GET_USER_ID", result.data.user.id)
                    commit("GET_USER_LOGIN", result.data.user.user_metadata.first_name)
                    commit("GET_USER_EMAIL", result.data.user.email)
                }
            }
            catch (e){
                console.log(e)
            }
        },
        async updateUserInfo({commit}){
            try {
                let dataUser = await updateUserData()
                if (dataUser){
                    commit("UPDATE_USER_INFO", dataUser)
                }
            }catch (e){
                console.log(e)
            }
        },
        async setUserData({dispatch, commit}, data){
            try {
                if (data){
                    await setDataInformationUser(data)
                    dispatch('updateUserInfo')
                }

            }catch (e){
                console.log(e)
            }
        },
        async outUser({commit}){
            try {
                commit("GET_USER", null)
            }catch (e){
                console.log(e)
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
            state.user.user_id = data[0].user_id
            state.user.user_login = data[0].login_user
            state.user.user_first_name = data[0].first_user_name
            state.user.user_last_name = data[0].last_user_name
            state.user.user_email = data[0].email_user
            state.user.user_number_phone = data[0].number_phone_user
            state.user.user_cart_bunk_number = data[0].cart_bank_user
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