import { request } from "../APIbackend.js"

export async function getPRoducts(){
    return request({
        method:"GET",
        url: `/`,
    })
}

export async function getProductID(id){
    return request({
        method:"GET",
        url: `/${id}`,
    })
}