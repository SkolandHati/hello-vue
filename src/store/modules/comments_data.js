import {supabase} from "@/services/APIauthorization";
export async function setCommentsForProduct(bodyComment){
    try {
        const randomID = () => { return Math.floor(Math.random() *(1000 - 1) + 1)}
        const obj = {
            "id": Number(randomID()),
            "content": String(bodyComment.content),
            "user_id": String(bodyComment.user_id),
            "author_name": String(bodyComment.author_name),
            "product_id": Number(bodyComment.product_id)
        }
        let {data} = await supabase
            .from('comments')
            .insert([obj]).select()
    }catch (e){
        console.log("Не удалось отправть комментарий в базу данных:", e)
    }
}

export async function getCommentsDataBase(productID){
    try {
        let {data} = await supabase.from('comments').select('*').eq('product_id', productID)
        if (data){
           return data
        }
    }catch (e){
        Promise.reject(e)
    }
}

async function deliteCommentsDatabase(data_comment) {
    try {
        let {error} = await supabase.from('comments').delete().eq('id', data_comment.id)
        if (error) throw error
    }catch (e){
        console.log("Не удалось удалить комментарий:", e)
    }
}
export default {
    namespaced: true,
    state:{
        product: null,
        dataDatabase: []
    },
    actions:{
        async updateDataComments({commit}, productId){
            try {
                let data = await getCommentsDataBase(productId)
                if (data){
                    commit("SET_DATA_BASE", data)
                }
            }catch (e){
                Promise.reject(e)
            }
        },
        async addCommentDatabase({commit}, dataComments){
            try {
                await setCommentsForProduct(dataComments)
                commit("APPEND_COMMENT_DATABSE", dataComments)
            }catch (e){
                Promise.reject(e)
            }
        },
        async deliteComments({dispatch, commit}, data){
            try {
                 await dispatch("updateDataComments")
                 await deliteCommentsDatabase(data)
                 if (data){
                    commit("DELITE_COMMENT_DB", data)
                 }
            }catch (e){
                Promise.reject(e)
            }
        }
    },
    mutations:{
        SET_DATA_BASE(state, data){
            state.dataDatabase = data
        },
        APPEND_COMMENT_DATABSE(state, data){
            state.dataDatabase.push(data)
        },
        DELITE_COMMENT_DB(state, data){
            let datass = state.dataDatabase.find(item => item.id === data.id)
            state.dataDatabase.forEach((items, index, arrye) => {
                if (arrye[index] === datass){
                    arrye.splice(index, 1)
                }
            })
        }
    },
    getters:{
        GET_DATA(state){
            return state.dataDatabase
        }
    }
}