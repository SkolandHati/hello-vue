import {getPRoducts, getProductID, getInfoBrends} from "@/services/entities/product_request"

export default {
    namespaced: true,
    state:{
        products: [],
        oneproduct: null,
        caruselProducts: [],
        randomProduct: null,
        brends: [],
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
        async loadCaruselProd({commit}){
            try {
                const result = await getPRoducts()
                commit("SET_CAROUSEL_PRODUCTS", result)
            }catch (e){
                Promise.reject(e)
            }
        },
        async getRandomProduct({commit}){
            try {
                 const randomNumber = () => { return Math.floor(Math.random() *(6 - 1) + 1)}
                 const result = await getProductID(randomNumber())
                 commit('SET_RANDOM_PROD', result)
            }catch (e){
                Promise.reject(e)
            }
        },
        async loadBrendsInfo({commit}){
            try {
                const result = await getInfoBrends()
                commit("SET_INFO_BRENDS", result)
            }catch (e){
                Promise.reject(e)
            }
        }
    },
    mutations: {
        SET_PRODUCTS_STATE(state, products) {
            state.products = products
        },
        ONE_SET_PRODUCTS(state, products) {
            state.oneproduct = products
        },
        SET_CAROUSEL_PRODUCTS(state, products){
            state.caruselProducts  = products

        },
        SET_RANDOM_PROD(state, prod){
            state.randomProduct = prod
        },
        SET_INFO_BRENDS(state, infoData){
            state.brends = infoData
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products
        },
        ONEPRODUCT(state) {
            return state.oneproduct
        },
        CAROSELPRODUCTS(state){
            return state.caruselProducts
        },
        BRENDSINFO(state){
            return state.brends
        },
        GETRANDOMPRODUCT(state){
            return state.randomProduct
        }
    }
}


