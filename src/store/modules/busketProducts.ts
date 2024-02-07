import {supabase} from "@/services/API_supabase";
import {Nullable} from "@/interfaces/Type/Types";
import Product from "@/interfaces/Product";

async function appProductInDatabase(bodyProduct: Product){
    try {
        if (bodyProduct){
            const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
            bodyProduct.id = randomID()
            let {data} = await supabase
                .from('busketProducts')
                .insert([bodyProduct]).select()
        }
    } catch (e){
        console.error(e)
    }
}

async function getDataBusketProducts(){
    try {
        let {data: dataFromDatabase, error} = await supabase.from('busketProducts').select('*')
        if (dataFromDatabase){
            return dataFromDatabase
        }
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}

async function plusProduct(dataProduct: Product){
    try {
        let {error} = await supabase.from('busketProducts').update({'quantity': dataProduct.quantity}).eq('id_product', dataProduct.id_product)
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}

async function minusProduct(dataProduct: Product){
    try {
        let {error} = await supabase.from('busketProducts').update({'quantity': dataProduct.quantity}).eq('id_product', dataProduct.id_product)
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}

async function deliteDataBusket(id: Nullable<number>){
    try {
        let {error} = await supabase.from('busketProducts').delete().eq('id_product', id)
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}

async function cleareDataBusket(){
    try {
        let {error} = await supabase.from('busketProducts').delete()
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}
export default {
    namespaced: true,
    state:{
        busketProduct: [] as Product[],
    },
    actions: {
        async loadProductsData({commit}:Nullable<unknown>){
            try {
                let data = await getDataBusketProducts()
                if (data){
                    commit('LOADBUSKETDATA', data)
                }
            } catch (e){
                console.error(e)
            }
        },
        async appendBusket({commit}:Nullable<unknown>, data: Product){
            try {
                await appProductInDatabase(data)
                commit("ADDPRODINB", data)
            } catch (e){
                console.error(e)
            }
        },
        async plusProdBusket({commit, state}:Nullable<unknown>, index: number){
            try {
                commit("PLUSPRODUCT", index)
                await plusProduct(state.busketProduct[index])
            } catch (e){
                console.error(e)
            }
        },
        async minusProdBusket({commit, state}:Nullable<unknown>, index: number){
            try {
                commit("MINUSPROD", index)
                await minusProduct(state.busketProduct[index])
            } catch (e){
                console.error(e)}
        },
        async deliteProduct({commit}:Nullable<unknown>, data: number){
            try {
                await deliteDataBusket(data)
                commit('DELITERPOD', data)
            } catch (e){
                console.error(e)
            }
        },
        async clearBusket({commit}:Nullable<unknown>){
            try {
                await cleareDataBusket()
                commit("CLEARBUSKET")
            } catch (e){
                console.error(e)
            }
        }
    },
    mutations: {
        LOADBUSKETDATA(state: { busketProduct: Product[]; }, data: Product[]){
            state.busketProduct = data
        },
        ADDPRODINB(state: { busketProduct: Product[]; }, prod: Product){
            state.busketProduct.push(prod)
        },
        PLUSPRODUCT(state: { busketProduct: { quantity: number; }[]; }, index: number){
            state.busketProduct[index].quantity++
        },
        MINUSPROD(state: { busketProduct: { quantity: number; }[]; }, index: number){
            state.busketProduct[index].quantity--
        },
        DELITERPOD(state: { busketProduct: any[]; }, data: number){
            let datass: Nullable<boolean> = state.busketProduct?.find((item: Product) => item.id_product === data)
            state.busketProduct?.forEach((items, index) => {
                if (state.busketProduct[index] === datass){
                    state.busketProduct.splice(index, 1)
                }
            })
        },
        CLEARBUSKET(state: { busketProduct: never[]; }){
            state.busketProduct = []
        }
    },
    getters: {
        BUSKETPRODUCTS(state: { busketProduct: Product[]; }){
            return state.busketProduct
        },
    },
}