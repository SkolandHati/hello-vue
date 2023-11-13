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
        const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
        const obj = {
            "id": Number(randomID()),
            "image_product": String(bodyProduct.image),
            "name_products": String(bodyProduct.name),
            "price_product": Number(bodyProduct.price),
            "name_brend": String(bodyProduct.brend),
            "product_id": Number(bodyProduct.id)
        }
        let {data, error} = await supabase.from('favoriteProdducts')
            .insert([obj]).select()
        if (error) throw error
    }catch (e){
        console.log(e)
    }
}

async function deliteFavotiteProductsDatabase(data){
    try {
        const {error} = await supabase.from('favoriteProdducts').delete().eq('id', data.id)
        if (error) throw error
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
                Promise.reject(e)
            }
        },
        async setFavoriteProduct({commit}, product){
            try {
                await setterFavoriteProducts(product)
                commit("APPEND_FAVORITE_PRODUCT", product)
            }catch (e){
                Promise.reject(e)
            }
        },
        async delitFavoriteProduct({dispatch, commit}, data){
            try {
                await dispatch("SET_PRODUCTS_FAVORITE")
                await deliteFavotiteProductsDatabase(data)
                commit("DELITEFAVORITEPRODUCT", data)
            }catch (e){
                Promise.reject(e)
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
        DELITEFAVORITEPRODUCT(state, product){
            let data = state.favorite_products.find(item => item.id === product.id)
            state.favorite_products.forEach((items, index, arrye) => {
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