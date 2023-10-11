import {createStore} from 'vuex'
import {getPRoducts, getProductID} from "../services/entities/product_request.js"
import {supabase} from "@/services/APIauthorization";


let store = {
    state:{
        user: null,
        products: [],
        oneproduct: null,
        busketProduct: null,
        index: 1
    },
    actions: {
        async loadProducts({commit}) {
            try {
                const result = await getPRoducts()
                commit("SET_PRODUCTS_STATE", result, {root: true})
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
        SET_PRODUCTS_STATE(state, products) {
            state.products = products
        },
        ONE_SET_PRODUCTS(state, products) {
            state.oneproduct = products
        },
        GET_USER(state, user){
            state.user = user
        },
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
        PRODUCTS(state) {
            return state.products
        },
        ONEPRODUCT(state) {
            return state.oneproduct
        },
        BUSKETPRODUCTS(state){
            return state.busketProduct
        },
        USERINSYSTEM(state){
            return state.user
        }
    },
    // strict: process.env.NODE_ENV !== 'production'
}


export default createStore(store);
