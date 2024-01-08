<template>
  <div class="container-post">
    <q-btn color="green"
           style="width: 100px; height: 35px;"
           :disabled="!user_data.user_login"
           @click="addComment">Отправить</q-btn>
    <q-input placeholder="Комментарий:" class="input_2"
             style="width: 95%; height: 35px;"
             outlined required v-model="comments"
             ></q-input>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
    name:"v-ModulePostComments",
    props:{
      productAll:{
        type: Object,
        required: true
      },
      user_data:{
        type:Object,
        required: true
      }
    },
    data(){
      return{
        comments: null,
      }
    },
    methods:{
      ...mapActions({
        appendComment: "commentsModules/addCommentDatabase",
      }),
      async addComment(){
        const data = await this.productAll
        if (data && this.user_data && this.comments){
          const obj = {
            "content": String(this.comments),
            "user_id": String(this.user_data.user_id),
            "author_name": String(this.user_data.user_login),
            "product_id": Number(this.productAll.id_product)
          }
          await this.appendComment(obj)
          this.comments = null
          alert('Comment send')
        }
      }
    },
}

</script>

<style scoped>
  .container-post{
    padding: 15px;
    display: flex;
  }
  :deep(.q-field__control::before){
    height: 35px;
  }
  :deep(.q-field__control::after){
    height: 35px;
  }
  :deep(.q-field__label.no-pointer-events.absolute.ellipsis){
    font-size: 14px;
  }
  :deep(.q-field__native.q-placeholder){
    padding-top: 5px;
    margin-bottom: 15px;
  }
</style>