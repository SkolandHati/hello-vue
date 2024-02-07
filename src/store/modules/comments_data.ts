import {supabase} from "@/services/API_supabase";
import {Nullable} from "@/interfaces/Type/Types";
import Comment from "@/interfaces/Comment";
async function setCommentsForProduct(bodyComment: Comment){
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
    } catch (e){
        console.error(e)
    }
}

async function getCommentsDataBase(productID: Nullable<number>){
    try {
        let {data} = await supabase.from('comments').select('*').eq('product_id', productID)
        if (data){
           return data
        }
    } catch (e){
        console.error(e)
    }
}
async function deliteCommentsDatabase(data_comment: Comment) {
    try {
        let {error} = await supabase.from('comments').delete().eq('id', data_comment.id)
        if (error) throw error
    } catch (e){
        console.error(e)
    }
}
export default {
    namespaced: true,
    state:{
        dataDatabase: [] as Comment[]
    },
    actions:{
        async updateDataComments({commit}: Nullable<unknown>, productId: number){
            try {
                let data = await getCommentsDataBase(productId)
                if (data){
                    commit("SET_DATA_BASE", data)
                }
            } catch (e){
                console.error(e)
            }
        },
        async addCommentDatabase({commit}: Nullable<unknown>, dataComments: Comment){
            try {
                await setCommentsForProduct(dataComments)
                commit("APPEND_COMMENT_DATABSE", dataComments)
            } catch (e){
                console.error(e)
            }
        },
        async deliteComments({dispatch, commit}: Nullable<unknown>, data: Comment){
            try {
                 await dispatch("updateDataComments")
                 await deliteCommentsDatabase(data)
                 if (data){
                    commit("DELITE_COMMENT_DB", data)
                 }
            } catch (e){
                console.error(e)
            }
        }
    },
    mutations:{
        SET_DATA_BASE(state: { dataDatabase: Comment[]; }, data: Comment[]){
            state.dataDatabase = data
        },
        APPEND_COMMENT_DATABSE(state: { dataDatabase: Comment[]; }, data: Comment){
            state.dataDatabase.push(data)
        },
        DELITE_COMMENT_DB(state: { dataDatabase: Comment[]; }, data: { id: number; }){
            let datass = state.dataDatabase.find(item => item.id === data.id)
            state.dataDatabase.forEach((items, index, arrye) => {
                if (arrye[index] === datass){
                    arrye.splice(index, 1)
                }
            })
        }
    },
    getters:{
        GET_DATA(state: { dataDatabase: Comment[]; }){
            return state.dataDatabase
        }
    }
}