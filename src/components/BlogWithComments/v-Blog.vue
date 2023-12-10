<template>
  <div class="container">
    <div class="q-pa-md row" v-if="getDataComments">
      <div class="comment" style="width: 100%; height: 70px" v-for="(itemComments, i) in getDataComments" :key="i">
        <q-chat-message v-if="itemComments.author_name === userData.user_login"
            :name="itemComments.author_name"
            :text="[itemComments.content]"
            sent
        ></q-chat-message>
        <q-chat-message v-if="itemComments.author_name !== userData.user_login"
            :name="itemComments.author_name"
            :text="[itemComments.content]"
        ></q-chat-message>
      </div>
    </div>
    <module-post-comments :productAll="productData" :user_data="userData"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import modulePostComments from "@/components/BlogWithComments/v-ModulePostComments.vue"
  export default {
    name: "vBlog",
    components:{
      modulePostComments
    },
    props:{
      productData:{
        type: Object,
        required: true
      }
    },
    computed:{
      ...mapGetters({
        userData: "user/USERINSYSTEM",
        userAuth: "user/AUTH",
        getDataComments: "commentsModules/GET_DATA"
      })
    },
    watch:{
      getDataComments() {
        this.loadCommentDataBase()
      }
    },
    mounted() {
      this.loadUserData()
      this.loadCommentDataBase()
      console.log(this.getDataComments)
    },
    methods:{
      ...mapActions({
        getUser: "user/getUser",
        responseDataComments: "commentsModules/updateDataComments",
        deliteComm: "commentsModules/deliteComments"
      }),
      async loadUserData(){
        try{
          await this.getUser()
        }catch (e){
          console.log(e)
        }
      },
      async loadCommentDataBase(){
        try {
          let data = await this.productData
          await this.responseDataComments(data.id)
        }catch (e){
          console.log(e)
        }
      },
    },
  }

</script>

<style scoped>
  :deep(.q-pa-md){
    height: 450px;
    position: relative;
    overflow-y: auto;
    display: block;
  }
  .container{
    border: 1px solid lightslategray;
    border-radius: 0 0 7px 7px;
  }
  :deep(div.q-pa-md:nth-child){
    margin: 30px;
  }
  .comment{
    display: inline-block;
  }
</style>