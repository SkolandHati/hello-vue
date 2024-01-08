import {requestInfoBrends } from "../APIbackend.js"
export async function getInfoBrends(){
    return requestInfoBrends({
        method:"GET",
        url: `/`,
    })
}

