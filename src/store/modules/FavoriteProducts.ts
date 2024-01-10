import {supabase} from "@/services/API_supabase";
import {Nullable} from "@/interfaces/Type/Types";
import Product from "@/interfaces/Product";

async function getFavoriteProducts(){
    try {
        let {data: favoriteProducts, error} = await supabase.from('favoriteProdducts')
    .select('*')
        if (favoriteProducts){
            return favoriteProducts
        }
    } catch (e){
        console.error(e)
    }
}

async function setterFavoriteProducts(bodyProduct: Product){
    try {
        if (bodyProduct){
            const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
            bodyProduct.id = randomID()
            console.log(bodyProduct)
            let {data, error} = await supabase.from('favoriteProdducts')
                .insert([bodyProduct]).select()
            if (error) throw error
        }
    } catch (e){
        console.error(e)
    }
}

async function deliteFavotiteProductsDatabase(id: number){
    try {
        if (id){
            const {error} = await supabase.from('favoriteProdducts').delete().eq('id_product', id)
            if (error) throw error
        }
    } catch (e){
        console.error(e)
    }
}


export default {
    namespaced: true,
    state:{
        favorite_products: [] as Product[]
    },
    actions: {
        async getFavoriteProduct({commit}:Nullable<unknown>){
            try {
                let data = await getFavoriteProducts()
                commit('SET_PRODUCTS_FAVORITE', data)
            } catch (e){
                console.error(e)
            }
        },
        async setFavoriteProduct({commit}:Nullable<unknown>, product: Product){
            try {
                await setterFavoriteProducts(product)
                commit("APPEND_FAVORITE_PRODUCT", product)
            } catch (e){
                console.error(e)
            }
        },
        async delitFavoriteProduct({dispatch, commit}:Nullable<unknown>, data: number){
            try {
                await dispatch("SET_PRODUCTS_FAVORITE")
                await deliteFavotiteProductsDatabase(data)
                commit("DELITEFAVORITEPRODUCT", data)
            } catch (e){
                console.error(e)
            }
        }
    },
    mutations: {
        SET_PRODUCTS_FAVORITE(state: { favorite_products: Product[]; }, products: Product[]){
            state.favorite_products = products
        },
        APPEND_FAVORITE_PRODUCT(state: { favorite_products: Product[]; }, product: Product){
            state.favorite_products.push(product)
        },
        DELITEFAVORITEPRODUCT(state: { favorite_products: Product[]; }, id: number){
            let data = state.favorite_products?.find(item => item.id_product === id)
            console.log(data)
            state.favorite_products?.forEach((items, index, arrye) => {
                if (arrye[index] === data){
                    arrye.splice(index, 1)
                }
            })
        }
    },
    getters: {
        GET_FAVORITE_PRODUCTS(state: { favorite_products: Product[]; },){
            return state.favorite_products
        }
    }
}