import {createStore} from 'vuex'

import products from "@/store/modules/products";
import busketProducts from "@/store/modules/busketProducts";
import favoriteProducts from "@/store/modules/FavoriteProducts"
import user from "@/store/modules/user";
import commentsModules from "@/store/modules/comments_data"


let store = {
    modules:{
        products,
        busketProducts,
        favoriteProducts,
        user,
        commentsModules
    }
}

export default createStore(store);