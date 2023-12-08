<template>
  <div class="container">
    <div class="comments-block" v-if="getDataComments">
      <div class="comment-data" v-for="(itemComments, i) in getDataComments" :key="i">
        <div class="block">
          <p class="author-name">{{itemComments.author_name}}</p>
          <h1 class="comment">{{itemComments.content}}</h1>
        </div>
        <button v-if="itemComments.author_name === userData.user_login" class="delite-comments" @click="deliteComm(itemComments)">X</button>
      </div>
    </div>
    <module-past-comments :productAll="productData" :user_data="userData"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import modulePastComments from "@/components/BlogWithComments/v-ModulePostComments.vue"
  export default {
    name: "vBlog",
    components:{
      modulePastComments
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
  .container{
    width: 100%;
    max-height: 525px;
    height: 100%;
    background-color: #f5f2f2;
    border-radius: 5px;
    margin: 15px;
    overflow-y: hidden;
  }
  .comments-block{
    width: 100%;
    height: 90%;
    display: block;
    padding-top: 5px;
    margin-top: 10px;
    position: relative;
    overflow-y: auto;
  }
  .comment-data{
    width: 500px;
    display: flex;
    z-index: 99;
  }
  .block{
    display: inline-block;
    width: 100%;
  }
  .author-name{
    margin-bottom: 0px;
    margin-top: 10px;
    border-radius: 5px 5px 0 0;
  }
  .author-name,.comment{
    padding-left: 20px;
    padding-top: 4px;
    padding-bottom: 5px;
    margin-left: 25px;
    background-color: #5e7c9d;
  }
  .comment{
    margin-top: 0px;
    font-size: 17px;;
    border-radius: 0 0 5px 5px;
  }
  .delite-comments{
    text-align: center;
    width: 30px;
    height: 30px;
    margin-top: 25px;
    font-size: 15px;
    border-radius: 50%;
    background-color: red;
  }
  .delite-comments:hover{
    background-color: #7a0909;
    border: 3px solid #c54b4b;
  }
</style>