import {supabase} from "@/services/API_supabase";
import InformationUser from "@/interfaces/InformationUser";
import {VuexStateInterface} from "@/interfaces/InterfacesState"
import {Nullable} from "@/interfaces/Type/Types";
async function setDataInformationUser(info_user: InformationUser){
    try {
        if (info_user){
            const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
            const obj = {
                "id": Number(randomID()),
                "user_id": String(info_user.id),
                "user_login": String(info_user.login),
                "user_first_name": String(info_user.first_name),
                "user_last_name": String(info_user.last_name),
                "user_email": String(info_user.email),
                "user_number_phone": String(info_user.number_phone),
                "user_cart_bunk_number": String(info_user.cart_bank)
            }
            let {error} = await supabase.from('information_user')
                .insert([obj]).select()
            if (error) throw error
        }else {
            console.log('Ошибка данных о пользователе')
        }
    } catch (e){
        console.error(e)
    }
}
async function updateUserData(){
    try {
        let dataUser = await supabase.auth.getUser()
        if (dataUser){
            // @ts-ignore
            const {data, error} = await supabase.from('information_user').select('*').eq('user_id', dataUser.data.user.id)
            return data
        }else {
            return null
        }
    } catch (e){
        console.error(e)
    }
}

export default {
    namespaced: true,
    state:{
        auth: false,
        user:{
            id: null,
            user_id: 0,
            user_login: null,
            user_first_name: null,
            user_last_name: null,
            user_email: null,
            user_number_phone: null,
            user_cart_bunk_number: null
        } as VuexStateInterface
    },
    actions: {
        async getUser({dispatch, commit}:Nullable<unknown>){
            try {
                const result = await supabase.auth.getUser()
                const data = await updateUserData()
                // @ts-ignore
                if (!!data.length){
                    dispatch('updateUserInfo')
                    if (result.data.user === null){
                        commit("GET_USER", false, result.data.user)
                    }else {
                    commit("GET_USER_STATUS", result.data.user.aud)}
                }else {
                    if (result.data.user === null){
                        commit("GET_USER", false, result.data.user)
                    }
                    // @ts-ignore
                    commit("GET_USER_STATUS", result.data.user.aud)
                    // @ts-ignore
                    commit("GET_USER_ID", result.data.user.id)
                    // @ts-ignore
                    commit("GET_USER_LOGIN", result.data.user.user_metadata.first_name)
                    // @ts-ignore
                    commit("GET_USER_EMAIL", result.data.user.email)
                }
            } catch (e){
                console.error(e)
            }
        },
        async updateUserInfo({commit}:Nullable<unknown>){
            try {
                let dataUser = await updateUserData()
                if (dataUser){
                    commit("UPDATE_USER_INFO", dataUser)
                }
            }catch (e){
                console.log(e)
            }
        },
        async setUserData({dispatch, commit}:Nullable<unknown>, data: InformationUser){
            try {
                if (data){
                    await setDataInformationUser(data)
                    dispatch('updateUserInfo')
                }
            } catch (e){
                console.error(e)
            }
        },
        async outUser({commit}:Nullable<unknown>){
            try {
                commit("GET_USER", null)
            } catch (e){
                console.error(e)
            }
        },
    },
    mutations:{
        GET_USER_STATUS(state: { auth: Nullable<boolean>; }, auth: Nullable<boolean>){
            state.auth = auth
        },
        GET_USER_ID(state: { user: VuexStateInterface; }, id: number){
            state.user.user_id = id
        },
        GET_USER_LOGIN(state: { user: VuexStateInterface; }, login: Nullable<string>){
            state.user.user_login = login
        },
        GET_USER_EMAIL(state: { user: VuexStateInterface; }, email: Nullable<string>){
            state.user.user_email = email
        },
        UPDATE_USER_INFO(state: { user: VuexStateInterface; }, data: VuexStateInterface[]){
            state.user.id = data[0].id
            state.user.user_id = data[0].user_id
            state.user.user_login = data[0].user_login
            state.user.user_first_name = data[0].user_first_name
            state.user.user_last_name = data[0].user_last_name
            state.user.user_email = data[0].user_email
            state.user.user_number_phone = data[0].user_number_phone
            state.user.user_cart_bunk_number = data[0].user_cart_bunk_number
        }
    },
    getters: {
        AUTH(state: { auth: Nullable<boolean>; }){
          return state.auth
        },
        USERINSYSTEM(state: { user: VuexStateInterface; }){
            return state.user
        }
    }
}