import axios from "axios";
import NProgress from "nprogress";

NProgress.configure({ easing: 'ease', speed: 500 })

let APIproducts

let APIbrendsInfo
export function initAPIproducts (store) {
    APIproducts = axios.create({
        baseURL: "http://localhost:3000/products",
        timeout: 3000
    })
    APIproducts.interceptors.request.use(
        config => {
            NProgress.start()
            return config
        }
    )
    APIproducts.interceptors.response.use(
        data => {
            NProgress.done()
            return data
        },
        error => {
            NProgress.done()
            if(error.response.status === 404)
            store.commit('AUTH', false)
            return Promise.reject(error)
        }
    )
}

export function initAPIinfoBrends(store){
    APIbrendsInfo = axios.create({
        baseURL: 'http://localhost:3000/brend',
        timeout: 2000
    })
    return APIbrendsInfo
}
export async function requestProducts (option = {}){
    try {
        const {data} = await APIproducts(option)
        return data
    }
    catch (error){
        return Promise.reject(error)
    }
}
export async function requestInfoBrends(option = {}){
    try {
        const {data} = await APIbrendsInfo(option)
        return data
    }catch (error){
        return Promise.reject(error)
    }
}