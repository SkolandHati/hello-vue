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

<script lang="ts">
  import {mapActions} from "vuex";
  import {defineComponent} from "vue";
  import type {PropType} from 'vue'
  import Product from "@/interfaces/Product";
  import InformationUser from "@/interfaces/InformationUser";
  import Comment from "@/interfaces/Comment"
  export default defineComponent({
      name:"v-ModulePostComments",
      props:{
        productAll:{
          type: Object as PropType<Product>,
          required: true
        },
        user_data:{
          type:Object as PropType<InformationUser>,
          required: true
        }
      },
      data(){
        return{
          comments: null as unknown as string,
        }
      },
      methods:{
        ...mapActions({
          appendComment: "commentsModules/addCommentDatabase",
        }),
        async addComment(){
          const data = await this.productAll
          if (data && this.user_data && this.comments){
            const obj:Comment = {
              "content": this.comments,
              "user_id": this.user_data.user_id,
              "author_name": this.user_data.user_login,
              "product_id": this.productAll.id_product
            }
            await this.appendComment(obj)
            this.comments = null as unknown as string
            alert('Comment send')
          }
        }
      },
  })

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