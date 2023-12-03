import {supabase} from "@/services/APIauthorization";

async function appProductInDatabase(bodyProduct){
    try {
        console.log(bodyProduct)
        const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
        const obj = {
            'id': randomID(),
            'image_product': String(bodyProduct.image),
            'name_product': String(bodyProduct.name),
            'id_product':Number(bodyProduct.id),
            'product_price':Number(bodyProduct.price),
            'quantity': Number(bodyProduct.quantity),
            'product_brend': String(bodyProduct.brend)
        }
        let {data} = await supabase
            .from('busketProducts')
            .insert([obj]).select()
    }catch (e){
        console.log(e)
    }
}

async function getDataBusketProducts(){
    try {
        let {data: dataFromDatabase, error} = await supabase.from('busketProducts').select('*')
        if (dataFromDatabase){
            return dataFromDatabase
        }
        if (error) throw error
    }catch (e){
        console.log("что то ему не нравиться",e)
    }
}

async function plusProduct(dataProduct){
    try {
        let {error} = await supabase.from('busketProducts').update({'quantity': dataProduct.quantity}).eq('id_product', dataProduct.id_product)
        if (error) throw error
    }catch (e){
        console.log("Неудалось увеличить кол-во продукта", e)
    }
}

async function minusProduct(dataProduct){
    try {
        let {error} = await supabase.from('busketProducts').update({'quantity': dataProduct.quantity}).eq('id_product', dataProduct.id_product)
        if (error) throw error
    }catch (e){
        console.log("Неудалось уменьшить кол-во продукта", e)
    }
}

async function deliteDataBusket(id){
    try {
        let {error} = await supabase.from('busketProducts').delete().eq('id_product', id)
        if (error) throw error
    }catch (e){
        console.log(e)
    }
}

async function cleareDataBusket(){
    try {
        let {error} = await supabase.from('busketProducts').delete()
        if (error) throw error
    }catch (e){
        console.log(e)
    }
}

export default {
    namespaced: true,
    state:{
        busketProduct: [],
    },
    actions: {
        async loadProductsData({commit}){
            try {
                let data = await getDataBusketProducts()
                if (data){
                    commit('LOADBUSKETDATA', data)
                }
            }catch (e){
                console.log(e)
            }
        },
        async appendBusket({commit}, data){
            try {
                await appProductInDatabase(data)
                commit("ADDPRODINB", data)
            }catch (e){
                console.log(e)
            }
        },
        async plusProdBusket({commit, state}, index){
            try {
                commit("PLUSPRODUCT", index)
                await plusProduct(state.busketProduct[index])
            }  catch (e){
                console.log(e)
            }
        },
        async minusProdBusket({commit, state}, index){
            try {
                commit("MINUSPROD", index)
                await minusProduct(state.busketProduct[index])
            }catch (e){
                console.log(e)}
        },
        async deliteProduct({commit}, data){
            try {
                await deliteDataBusket(data)
                commit('DELITERPOD', data)
            }  catch (e){
                console.log(e)
            }
        },
        async clearBusket({commit}){
            try {
                await cleareDataBusket()
                commit("CLEARBUSKET")
            }catch (e){
                console.log(e)
            }
        }
    },
    mutations: {
        LOADBUSKETDATA(state, data){
            state.busketProduct = data
        },
        ADDPRODINB(state, prod){
            state.busketProduct.push(prod)
        },
        PLUSPRODUCT(state, index){
            state.busketProduct[index].quantity++
        },
        MINUSPROD(state, index){
            state.busketProduct[index].quantity--
        },
        DELITERPOD(state, data){
            let datass = state.busketProduct?.find(item => item.id === data.id)
            state.busketProduct?.forEach((items, index, arrye) => {
                if (state.busketProduct[index] === datass){
                    state.busketProduct.splice(index, 1)
                }
            })
        },
        CLEARBUSKET(state){
            state.busketProduct = []
        }
    },
    getters: {
        BUSKETPRODUCTS(state){
            return state.busketProduct
        },
    },
}