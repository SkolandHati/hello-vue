<template>
  <section class="container">
    <main class="container-main">
      <div class="window-accept" v-if="loadData">
        <h1>Регистрация прошла успешна!</h1>
        <h2>Пользователь создан</h2>
        <div class="buttn">
          <button @click="goHome">Завершить и вернуться к главной странице</button>
        </div>
      </div>
      <div class="window-danger" v-else>
          <h1>Не удалось успешно пройти регистрацию</h1>
      </div>
    </main>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import {supabase} from "@/services/APIauthorization";
  export default {
    name: "checkregisteration",
    computed:{
      ...mapGetters({
        userAuth: 'user/AUTH'
      })
    },
    mounted() {
      this.loadData()
      this.loadUserData()
    },
    methods:{
      ...mapActions({
        thenUser:'user/getUser'
      }),
      async loadUserData(){
        try {
          await this.thenUser()
        }catch (e){
          console.log(e)
        }
      },
      async loadData(){
        try{
          const data = await supabase.auth.getUser()
          if (data){
            return data.data.user
          }else{
            return false
          }
        }catch (e){
          console.log(e)
        }
      },
      goHome(){
        return this.$router.push({name: 'v-HomePage'})
      }
    },
  }

</script>

<style scoped>
  body{
    background-color: #6e6d6d;
  }
  .container-main{
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
  }
  .window-accept{
    width: 500px;
    height: 400px;
    margin: 100px;
    margin-left: 30%;
    border: 2px solid #1a6c80;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .window-accept>h1, h2{
    text-align: center;
  }
  .buttn{
    width: 480px;
    height: 300px;
    display: block;
    margin-top: 50px;
    margin-left: 10px;
  }
  .buttn>button{
    width: 270px;
    height: 35px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 25px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
  h1{
    color: brown;
  }

</style>