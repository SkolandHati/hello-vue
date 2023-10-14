export default {
    namespaced: true,
    state:{
        busketProduct: null,
    },
    actions: {
        async appendBusket({commit}, data){
            try {
                commit("ADDPRODINB", data)
            }catch (e){
                Promise.reject(e)
            }
        },
        plusProdBusket({commit}, data){
            try {
                commit("PLUSPROD", data)
            }  catch (e){
                Promise.reject(e)
            }
        },
        minusProdBusket({commit}, data){
            try {
                commit("MINUSPROD", data)
            }catch (e){
                Promise.reject(e)
            }
        },
        deliteProduct({commit}, data){
            try {
                commit('DELITERPOD', data)
            }  catch (e){
                Promise.reject(e)
            }
        },
        clearBusket({commit}){
            try {
                commit("CLEARBUSKET")
            }catch (e){
                Promise.reject(e)
            }
        }
    },
    mutations: {
        ADDPRODINB(state, prod){
            state.busketProduct = prod
        },
        PLUSPROD(state, data){
            state.busketProduct[data].quantity++
        },
        MINUSPROD(state, data){
            state.busketProduct[data].quantity--
        },
        DELITERPOD(state, data){
            state.busketProduct[data] = undefined
        },
        CLEARBUSKET(state){
            state.busketProduct = []
        }
    },
    getters: {
        BUSKETPRODUCTS(state){
            return state.busketProduct
        },
    },
    // strict: process.env.NODE_ENV !== 'production'
}