<template>
  <div class="container-post">
    <button :disabled="!user_data.user_id"
            :style="{backgroundColor: 'green'}"
            class="submit-comment"
            @click="addComment"
            @keyup.enter="addComment">ОТПРАВИТЬ</button>
    <div class="input-container">
      <textarea id="inputs-text"
                class="input-message"
                placeholder="Введите сообшение"
                required v-model="comments"></textarea>
    </div>
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
        comments: null
      }
    },
    methods:{
      ...mapActions({
        appendComment: "commentsModules/addCommentDatabase",
      }),

      async addComment(){
        const data = await this.productAll
        if (data && this.user_data && this.comments !== null){
          const obj = {
            "content": String(this.comments),
            "user_id": String(this.user_data.user_id),
            "author_name": String(this.user_data.user_name),
            "product_id": Number(this.productAll.id)
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
    display: flex;
    width: 100%;
    height: 50px;
    padding-bottom: 15px;
  }
  .container-post>.submit-comment{
    width: 90px;
    height: 35px;
    margin-right: 20px;
    margin-left: 25px;
    padding: 6px;
    border-radius: 5px;
    border: 3px;
  }
  .container-post>.submit-comment:hover{
    cursor: pointer;
    border: 2px solid #46ff00;
  }
  .container-post>.submit-comment>textarea{
    width: 432px;
    height: 25px;
  }
  .container-post>.input-container>.input-message{
    width: 432px;
    height: 26px;
  }
</style>