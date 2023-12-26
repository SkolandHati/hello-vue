import {getProductID, getInfoBrends} from "@/services/entities/product_request"
import {supabase} from "@/services/API_supabase";

async function getProductsDataBase(){
    try {
        let {data} = await supabase.from('products').select('*')
        if (data){
            return data
        }
    }catch (e){
        console.log(e)
    }
}
async function getProductsIDDataBase(id){
    try {
        let {data} = await supabase.from('products').select('*').eq('id_product', id)
        if (data){
            return data
        }
    }catch (e){
        console.log(e)
    }
}
export default {
    namespaced: true,
    state:{
        products: [],
        catalogProducts: [],
        oneproduct: null,
        caruselProducts: [],
        randomProduct: null,
        brends: [],
    },
    actions: {
        async loadProducts({commit}) {
            try {
                const result = await getProductsDataBase()
                commit("SET_PRODUCTS_STATE", result)
            } catch (e) {
                console.log(e)
            }
        },
        async loadOneProduct({commit, state}, id_product){
            try {
                const result = await getProductsIDDataBase(id_product)
                commit("ONE_SET_PRODUCTS", result)
            }
            catch (e){
                console.log(e)
            }
        },
        async loadProdcutsCatalog({dispatch, commit}, data){
            try {
                await dispatch('loadProducts')
                commit("SET_PRODUCTS_CATALOG", data)
            }catch (e){
                console.log(e)
            }
        },
        async loadCaruselProd({dispatch,commit}){
            try {
                await dispatch('loadProducts')
                await dispatch('loadBrendsInfo')
                commit("SET_CAROUSEL_PRODUCTS")
            }catch (e){
                console.log(e)
            }
        },
        async loadBrendsInfo({commit}){
            try {
                const result = await getInfoBrends()
                commit("SET_INFO_BRENDS", result)
            }catch (e){
                console.log(e)
            }
        }
    },
    mutations: {
        SET_PRODUCTS_STATE(state, products) {
            state.products = products
        },
        SET_PRODUCTS_CATALOG(state, nameBrend){
            let list = state.products?.filter(item => item.product_brend === nameBrend)
            state.catalogProducts = list
        },
        ONE_SET_PRODUCTS(state, products) {
            state.oneproduct = products[0]
        },
        SET_CAROUSEL_PRODUCTS(state){
            const randomNumber = () => { return Math.floor(Math.random() *(4 - 1) + 1)}
            let data = state.brends[randomNumber()].brend_Name
            let list = state.products?.filter(item => item.product_brend === data)
            state.caruselProducts = list
        },
        SET_INFO_BRENDS(state, infoData){
            state.brends = infoData
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products
        },
        PRODUCTSFORCATALOG(state){
            return state.catalogProducts
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
    }
}


