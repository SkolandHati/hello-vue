import {createRouter, createWebHistory} from 'vue-router'
import {supabase} from "@/services/APIauthorization";

const App = () => import('@/App.vue')
const Home = () => import('@/components/Home/v-HomePage')

const BrendsPageCatalog = () => import('@/components/Card-Product/v-BrendsPageProducts.vue')
const Products = () => import('@/components/Card-Product/v-cart-items.vue')
const ProductID = () => import('@/components/Card-Product/v-cart-item-page')

const SignUp = () => import('@/components/User/v-SignUp.vue')

const checkRegistration = () => import('@/components/User/v-checkregistration.vue')
const SignIn = () => import('@/components/User/v-SignIn.vue')

const BusketPage = () => import('@/components/OrderBusket/v-BusketPage.vue')

const FavoritePage = () => import('@/components/Favorite/v-FavoritePage.vue')

const router = createRouter({
    routes: [
        {
            path: '/',
            component: App,
            children:[
                {
                    name: 'v-HomePage',
                    path: '',
                    component: Home,
                },
                {
                    name: 'v-BrendsPageProducts',
                    path: '/brends_product',
                    component: BrendsPageCatalog
                },
                {
                    path:'/products/:id',
                    name:'v-cart-item-page',
                    component: ProductID,
                },
                {
                    path: 'signup',
                    name: 'v-SignUp',
                    component: SignUp,
                },
                {
                    path:'/signup/finaliregistr',
                    name:'v-checkregistration',
                    component:checkRegistration
                },
                {
                    path:'/signin',
                    name:'v-SignIn',
                    component: SignIn
                },
                {
                    path:'/busket',
                    name:'v-BusketPage',
                    component: BusketPage,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path:'/favorite_products',
                    name:'vFavoritePage',
                    component:FavoritePage,
                    meta: {
                        requireAuth: true
                    }
                }
            ],
        },
    ],
    history: createWebHistory()
})

async function getUser(next){
    let localUser = await supabase.auth.getSession()
    if (localUser.data.session === null){
        next('/signin')
    }else {
        next()
    }
}
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth){
        getUser(next)
    }
    else {
        next()
    }
})

export default router