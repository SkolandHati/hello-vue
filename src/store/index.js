import {createStore} from 'vuex'

import products from "@/store/modules/products";
import busketProducts from "@/store/modules/busketProducts";
import user from "@/store/modules/user"


let store = {
    modules:{
        products,
        busketProducts,
        user
    }
}

export default createStore(store);