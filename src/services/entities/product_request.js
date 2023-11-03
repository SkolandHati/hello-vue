import { requestProducts, requestInfoBrends } from "../APIbackend.js"

export async function getPRoducts(){
    return requestProducts({
        method:"GET",
        url: `/`,
    })
}

export async function getProductID(id){
    return requestProducts({
        method:"GET",
        url: `/${id}`,
    })
}

export async function getInfoBrends(){
    return requestInfoBrends({
        method:"GET",
        url: `/`,
    })
}

