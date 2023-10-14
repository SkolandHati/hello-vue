import {getPRoducts, getProductID} from "@/services/entities/product_request"

export default {
    namespaced: true,
    state:{
        products: [],
        oneproduct: null,
        index: 1
    },
    actions: {
        async loadProducts({commit}) {
            try {
                const result = await getPRoducts()
                commit("SET_PRODUCTS_STATE", result)
            } catch (e) {
                Promise.reject(e)
            }
        },
        async loadsProduct({commit, state}, number){
            try {
                const result = await getProductID(number|| state.index)
                commit("ONE_SET_PRODUCTS", result)
            }
            catch (e){
                Promise.reject(e)
            }
        },
    },
    mutations: {
        SET_PRODUCTS_STATE(state, products) {
            state.products = products
        },
        ONE_SET_PRODUCTS(state, products) {
            state.oneproduct = products
        },
    },
    getters: {
        PRODUCTS(state) {
            return state.products
        },
        ONEPRODUCT(state) {
            return state.oneproduct
        },
    }
}


