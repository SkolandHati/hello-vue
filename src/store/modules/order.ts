import {supabase} from "@/services/API_supabase";
import {Nullable} from "@/interfaces/Type/Types";
import Order from "@/interfaces/Order";
async function getOrderDataBase(){
    try {
        const {data} = await supabase.from('order_user').select('*')
        if (data){
            return data}
        return false
    } catch (e){
        console.error(e)
    }
}

async function setOrderInDataBase(order: Order){
    try {
        const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
        if (order){
            order.id = randomID()
            const {error} = await supabase.from('order_user').insert([order]).select()
            if (error) throw error
        }
    } catch (e){
        console.error(e)
    }
}

export default {
    namespaced: true,
    state:{
        order: [] as Order[]
    },
    actions: {
        async getOrder({commit}:Nullable<unknown>){
            try {
                let data = await getOrderDataBase()
                if (data){
                    commit('SET_ORDER_STORE', data)
                }
            } catch (e){
                console.error(e)
            }
        },
        async setOrder({commit}:Nullable<unknown>, data: Order){
            try {
                if (data){
                    await setOrderInDataBase(data)
                    commit('ADD_ORDER_IN_DATABASE', data)
                }
            } catch (e){
                console.error(e)
            }
        }
    },
    mutations: {
        SET_ORDER_STORE(state: { order: Order[]; }, data: Order[]){
            state.order = data
        },
        ADD_ORDER_IN_DATABASE(state: { order: Order[]; }, data: Order){
            state.order.push(data)
        }
    },
    getters: {
        ORDER(state: { order: Order[]; },) {
            return state.order
        }
    }
}