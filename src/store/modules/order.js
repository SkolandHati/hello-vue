import {supabase} from "@/services/APIauthorization";
async function getOrderDataBase(){
    try {
        const {data} = await supabase.from('order_user').select('*')
        if (data){
            return data}
    }catch (e){
        console.log(e)
    }
}

async function setOrderInDataBase(order){
    try {
        const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
        if (order){
            order.id = randomID()
            const {error} = await supabase.from('order_user').insert([order]).select()
            if (error) throw error
        }
    }catch (e){
        console.log(e)
    }
}

export default {
    namespaced: true,
    state:{
        order: []
    },
    actions: {
        async getOrder({commit}){
            try {
                let data = await getOrderDataBase()
                if (data){
                    commit('SET_ORDER_STORE', data)
                }
            }catch (e){
                console.log(e)
            }
        },
        async setOrder({commit}, data){
            try {
                if (data){
                    await setOrderInDataBase(data)
                    commit('ADD_ORDER_IN_DATABASE', data)
                }
            }catch (e){
                console.log(e)
            }
        }
    },
    mutations: {
        SET_ORDER_STORE(state, data){
            state.order = data
        },
        ADD_ORDER_IN_DATABASE(state, data){
            state.order.push(data)
        }
    },
    getters: {
        ORDER(state) {
            return state.order
        }
    }
}