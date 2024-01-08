import axios from "axios";

let APIbrendsInfo

export function initAPIinfoBrends(store){
    APIbrendsInfo = axios.create({
        baseURL: 'http://localhost:3000/brend',
        timeout: 2000
    })
    return APIbrendsInfo
}
export async function requestInfoBrends(option = {}){
    try {
        const {data} = await APIbrendsInfo(option)
        return data
    }catch (error){
        return Promise.reject(error)
    }
}