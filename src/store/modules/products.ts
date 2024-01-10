import {getInfoBrends} from "@/services/entities/product_request"
import {supabase} from "@/services/API_supabase";
import {Nullable} from "@/interfaces/Type/Types";
import Product from "@/interfaces/Product";
import Brend from "@/interfaces/Brend";

async function getProductsDataBase(){
    try {
        let {data} = await supabase.from('products').select('*')
        if (data){
            return data
        }
    } catch (e){
        console.error(e)
    }
}
async function getProductsIDDataBase(id: number){
    try {
        let {data} = await supabase.from('products').select('*').eq('id_product', id)
        if (data){
            return data
        }
    } catch (e){
        console.error(e)
    }
}
export default {
    namespaced: true,
    state:{
        products: [] as Product[],
        catalogProducts: [] as Product[],
        oneproduct: null as Nullable<Product>,
        caruselProducts: [] as Product[],
        brends: [] as Brend[],
    },
    actions: {
        async loadProducts({commit}:Nullable<unknown>) {
            try {
                const result = await getProductsDataBase()
                commit("SET_PRODUCTS_STATE", result)
            } catch (e) {
                console.log(e)
            }
        },
        async loadOneProduct({commit, state}:Nullable<unknown>, id_product: number){
            try {
                const result = await getProductsIDDataBase(id_product)
                commit("ONE_SET_PRODUCTS", result)
            } catch (e){
                console.error(e)
            }
        },
        async loadProdcutsCatalog({dispatch, commit}:Nullable<unknown>, data: Product){
            try {
                await dispatch('loadProducts')
                commit("SET_PRODUCTS_CATALOG", data)
            } catch (e){
                console.error(e)
            }
        },
        async loadCaruselProd({dispatch,commit}:Nullable<unknown>){
            try {
                await dispatch('loadProducts')
                await dispatch('loadBrendsInfo')
                commit("SET_CAROUSEL_PRODUCTS")
            } catch (e){
                console.error(e)
            }
        },
        async loadBrendsInfo({commit}:Nullable<unknown>){
            try {
                const result = await getInfoBrends()
                commit("SET_INFO_BRENDS", result)
            } catch (e){
                console.error(e)
            }
        }
    },
    mutations: {
        SET_PRODUCTS_STATE(state: { products: Product[]; }, products: Product[]) {
            state.products = products
        },
        SET_PRODUCTS_CATALOG(state: { catalogProducts: Product[]; products: Product[]; }, nameBrend: string){
            let list = state.products?.filter(item => item.product_brend === nameBrend)
            state.catalogProducts = list
        },
        ONE_SET_PRODUCTS(state: { oneproduct: Product; }, products: Product[]) {
            state.oneproduct = products[0]
        },
        SET_CAROUSEL_PRODUCTS(state: { caruselProducts: Product[]; products: Product[]; brends: Brend[]}){
            const randomNumber = () => {return Math.floor(Math.random() * (4 - 1) + 1)}
            let data = state.brends[randomNumber()].brend_Name
            let list = state.products?.filter((item: Product) => item.product_brend === data)
            state.caruselProducts = list
        },
        SET_INFO_BRENDS(state: { brends: Brend[] }, infoData: Brend[]){
            state.brends = infoData
        }
    },
    getters: {
        PRODUCTS(state: { products: Product[]; }) {
            return state.products
        },
        PRODUCTSFORCATALOG(state: { catalogProducts: Product[]; }){
            return state.catalogProducts
        },
        ONEPRODUCT(state: { oneproduct: Product; }) {
            return state.oneproduct
        },
        CAROSELPRODUCTS(state: { caruselProducts: Product[]; }){
            return state.caruselProducts
        },
        BRENDSINFO(state: { brends: Brend[]; }){
            return state.brends
        },
    }
}


