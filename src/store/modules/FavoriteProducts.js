import {supabase} from "@/services/APIauthorization";

async function getFavoriteProducts(){
    try {
        let {data: favoriteProducts, error} = await supabase.from('favoriteProdducts')
    .select('*')
        if (favoriteProducts){
            return favoriteProducts
        }
    }catch (e){
        console.log(e)
    }
}

async function setterFavoriteProducts(bodyProduct){
    try {
        if (bodyProduct){
            const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
            bodyProduct.id = randomID()
            console.log(bodyProduct)
            let {data, error} = await supabase.from('favoriteProdducts')
                .insert([bodyProduct]).select()
            if (error) throw error
        }
    }catch (e){
        console.log(e)
    }
}

async function deliteFavotiteProductsDatabase(id){
    try {
        if (id){
            const {error} = await supabase.from('favoriteProdducts').delete().eq('id_product', id)
            if (error) throw error
        }
    }catch (e){
        console.log(e)
    }
}


export default {
    namespaced: true,
    state:{
        favorite_products: []
    },
    actions: {
        async getFavoriteP({commit}){
            try {
                let data = await getFavoriteProducts()
                commit('SET_PRODUCTS_FAVORITE', data)
            }catch (e){
                console.log(e)
            }
        },
        async setFavoriteProduct({commit}, product){
            try {
                await setterFavoriteProducts(product)
                commit("APPEND_FAVORITE_PRODUCT", product)
            }catch (e){
                console.log(e)
            }
        },
        async delitFavoriteProduct({dispatch, commit}, data){
            try {
                await dispatch("SET_PRODUCTS_FAVORITE")
                await deliteFavotiteProductsDatabase(data)
                commit("DELITEFAVORITEPRODUCT", data)
            }catch (e){
                console.log(e)
            }
        }
    },
    mutations: {
        SET_PRODUCTS_FAVORITE(state, products){
            state.favorite_products = products
        },
        APPEND_FAVORITE_PRODUCT(state, product){
            state.favorite_products.push(product)
        },
        DELITEFAVORITEPRODUCT(state, id){
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
        GET_FAVORITE_PROD(state){
            return state.favorite_products
        }
    }
}