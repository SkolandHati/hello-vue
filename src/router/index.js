import {createRouter, createWebHistory, RouteLocationRaw, RouteRecordRaw,} from 'vue-router'
import {supabase} from "@/services/API_supabase";
import {RouterType} from "@/interfaces/Types";

const App = () => import('@/App.vue')
const Home = () => import('@/components/Home/v-HomePage')

const BrendsPageCatalog = () => import('@/components/Card-Product/v-BrendsPageProducts.vue')
const Products = () => import('@/components/Card-Product/v-cart-items.vue')
const ProductID = () => import('@/components/Card-Product/v-cart-item-page')

const SignUp = () => import('@/components/RegisrationUser/v-SignUp.vue')

const checkRegistration = () => import('@/components/RegisrationUser/v-checkregistration.vue')
const SignIn = () => import('@/components/RegisrationUser/v-SignIn.vue')

const UserSetting = () => import('@/components/User/v-UserSetting.vue')

const BusketPage = () => import('@/components/OrderBusket/v-BusketPage.vue')

const OrderPage = () => import('@/components/Order/v-OrderPage.vue')

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
                    path: '/brends_product/:brend',
                    name: 'v-BrendsPageProducts',
                    component: BrendsPageCatalog
                },
                {
                    path:'/products/:id_product',
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
                  path: '/settings',
                  name: 'v-UserSetting',
                  component:UserSetting
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
                    path:'/order',
                    name:'v-OrderPage',
                    component:OrderPage
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
        }
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