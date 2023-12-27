<template>
  <section class="imgcont">
    <main>
      <div class="circle"></div>
      <div class="register-form-container">
        <h1 class="form-title">
          Авторизация
        </h1>
        <div class="form-field">
          <input v-model="email" type="text" placeholder="Почта">
        </div>
        <div class="form-field">
          <input v-model="password" type="text" placeholder="Пороль">
        </div>
        <div class="form-button">
          <router-link to="/" class="route">
          <a href="#" class="button button-google" @click="signIn"> Войти</a>
          </router-link>
            <p>Или</p>
            <a href="#" class="button button-google" @click="goSignUp"> Зарегистрироваться</a>
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {supabase} from "@/services/API_supabase";
  import {ref} from "vue";
  export default defineComponent({
    name: 'v-SignIn',
    setup(){
      let email = ref('')
      let password = ref('')
      const signIn = async () => {
        try {
          if (!email.value && !password.value){
            this.$router.push({name: 'v-SignIn'})
          }
            const {data, error } = await supabase.auth.signInWithPassword({
              email: email.value,
              password: password.value
            })
        }catch (e){
          console.log(e)
        }
      }
      const goSignUp = () => {
        return this.$router.push({name: 'v-SignUp'})
      }
      return {
        email,
        password,
        signIn,
        goSignUp
      }
    },
  })

</script>

<style scoped>
    .imgcont {
      background-image: none;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }
    main {
      background: #F1F5FE;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .circle {
      position: absolute;
      z-index: auto;
      height: auto;
      border-radius: 50%;
      background: #F7FAFF;
      box-shadow: 0px 4px 70px 6px rgba(217, 229, 255, 0.25);
      animation-name: fadeCircle;
      animation-duration: .7s;
      animation-timing-function: ease-in-out;
      animation-delay: .5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
    @keyframes fadeCircle {
      0% {
        width: 2534px;
        height: 2534px;
      }

      25% {
        width: 1500px;
        height: 1500px;
      }

      50% {
        width: 1000px;
        height: 1000px;
      }

      75% {
        opacity: .75;
      }

      100% {
        width: 534px;
        height: 534px;
      }
    }
    .form-field>input{
      height: 45px;
      width: 93%;
      font-size: 14px;
      line-height: 16px;
      border: 2px solid #E9F2FF;
      border-radius: 5px;
      padding-left: 25px;
      color: #3B5983;
    }
    .form-field>input{
      outline: none;
      border: 2px solid #C1F9CD;
    }
    .register-form-container {
      opacity: 0;
      position: relative;
      z-index: 2;
      max-width: 415px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 6px 50px rgba(217, 229, 255, 0.7);
      border-radius: 20px;
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 38px;
      padding-bottom: 38px;
      animation-name: fadeForm;
      animation-duration: .7s;
      animation-timing-function: ease-in-out;
      animation-delay: 1.4s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
    @keyframes fadeForm {
      0% {
        opacity: 0;
      }

      25% {
        opacity: .25;
      }

      50% {
        opacity: .5;
      }

      75% {
        opacity: .75;
      }

      100% {
        opacity: 1;
      }
    }
    .register-form-container>.form-title {
      text-align: center;
      color: #30507D;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      margin-bottom: 38px;
    }

    .register-form-container>.form-field {
      margin-bottom: 13px;

    }
    .form-button>.route>.button,
    .form-button>.button{
      font-weight: bold;
      font-size: 14px;
      display: block;
      height: 45px;
      background: #247FFF;
      border-radius: 5px;
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      line-height: 45px;
      cursor: pointer;
    }
    .form-button>.route>.button:hover,
    .form-button>.button{
      background-color: #0D6CF2;
    }

    .form-button>.route>.button-google,
    .form-button>.button{
      text-decoration: none;
    }

    .form-button>.route>a.button-google,
    .form-button>.button{
      color: #fff;
      background: #0D6CF2;
    }
    .form-button>.route>a.button-google:hover,
    .form-button>.button{
      background: #3a58be;
      color: #fff;
    }
    .form-button p {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #405D87;
      text-align: center;
      padding-top: 5px;
      padding-bottom: 5px;
    }
</style>