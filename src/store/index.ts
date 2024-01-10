import {createStore, Store} from 'vuex'
import { InjectionKey } from 'vue'
import products from "@/store/modules/products";
import busketProducts from "@/store/modules/busketProducts";
import favoriteProducts from "@/store/modules/FavoriteProducts"
import user from "@/store/modules/user";
import commentsModules from "@/store/modules/comments_data"
import order from '@/store/modules/order'

interface State {
    products: any
    busketProducts: any
    favoriteProducts: any
    user: any
    commentsModules: any
    order: any
}
export const key: InjectionKey<Store<State>> = Symbol()

let store = {
    modules:{
        products,
        busketProducts,
        favoriteProducts,
        user,
        commentsModules,
        order,
    }
}

// @ts-ignore
export default createStore(store);