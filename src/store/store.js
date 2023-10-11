import Vuex from "vuex"
import axios from "axios"

let store = new Vuex.Store({
    state:{
        products: [],
        index: 1
    },
    actions:{
        async GET_PRODUCTS_FROM_API({commit}){
            return await axios.get("http://localhost:3000/products")
            .then((response) => {
                if (response.status === 200){
                    return response.data
                }else{ return new Promise.reject(error)}
            })
            .then((response) => {
                commit("SET_PRODUCTS_STATE", response)
                return response
            })
            .catch((error) => {
                console.log(error)
                return error;
            })
        },
        DROP_GET_PRODUCTS({commit}){
            if (GET_PRODUCTS_FROM_API.state === "fulfilled"){
                commit("")}
            else{console.log("No winner")}
        }
    },
    mutations:{
        SET_PRODUCTS_STATE: (state , products) => {
            state.products = products
        },
    },
    getters:{
        allproducts : state => state.products,
        PRODUCTS(state){
            return state.products;
        },
        getProductbyId: state => id => {
            if (state.products.length < 0){
                store.dispatch('GET_PRODUCTS_FROM_API')
            }else{return state.products.find(products => products.id == id)}
        }
    }
})

            // return await getPRoducts()
            // .then((r) => {
            //     commit("SET_PRODUCTS_STATE", r)
            //     return r
            // })
            // .catch((er) => {
            //     console.log(er)
            //     return er
            // })

export default store;