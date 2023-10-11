<template>
  <section class="container">
    <main class="container-main">
      <div class="window-accept" v-if="iscurrensuser">
        <h1>Регистрация прошла успешна!</h1>
        <h2>Пользователь создан</h2>
        <div class="buttn">
          <button @click="$router.push({name: 'v-HomePage'})">Завершить и вернуться к главной странице</button>
          <button @click="$router.push({name: 'v-HomePage'})">Профиль</button>
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
  import router from "@/router";

  export default {
    name: "checkRegister",
    methods:{
      ...mapActions([
          'getUsers'
      ]),
      router() {
        return router
      },
      // async loadData(){
      //   try{
      //     await this.getUsers()
      //   }catch (e){
      //     Promise.reject(e)
      //   }
      // },
      async iscurrensuser(){
        try {
          const data = await supabase.auth.getUser()
          if (data.user.aud){
            return data
          }else {
            return false
          }
        }catch (e){
          Promise.reject(e)
        }
      }
    },
    computed:{
      ...mapGetters([
          'USERINSYSTEM'
      ])
    },
    mounted() {
      // this.loadData()
    }
  }

</script>

<style>
  body{
    background-color: #6e6d6d;
  }
  .container>.container-main{
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
  }
  .container>.container-main>.window-accept{
    width: 500px;
    height: 400px;
    margin: 100px;
    margin-left: 30%;
    border: 2px solid #1a6c80;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .container>.container-main>.window-accept>h1, h2{
    text-align: center;
  }
  .container>.container-main>.window-accept>.buttn{
    width: 480px;
    height: 300px;
    display: block;
    margin-top: 50px;
    margin-left: 10px;
  }
  .container>.container-main>.window-accept>.buttn>button{
    width: 270px;
    height: 35px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 25px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .container>.container-main>.window-danger>h1{
    color: brown;
  }

</style>