<template>
  <section class="container">
    <main>
      <div class="circle">
      </div>
      <div class="register-form-container">
        <h1 class="form-title">
          Регистрация
        </h1>
        <div class="form-field">
          <input v-model="nameUser" type="text" placeholder="Имя">
          <h1 v-if="v$.nameUser.$error">Некоректное имя пользователя</h1>
        </div>
        <div class="form-field">
          <input v-model="emailAdress" type="text" placeholder="Почта">
          <h1 v-if="v$.emailAdress.$error">Некоректный email</h1>
        </div>
        <div class="form-field">
          <input v-model="password" type="text" placeholder="Пороль">
          <h1 v-if="v$.password.$error">Некоректный пароль</h1>
        </div>
        <div class="form-field">
          <input v-model="confirmpassword" type="text" placeholder="Подтвердить пороль">
          <h1 v-if="!confirmPassword">Пароли не совпадают</h1>
        </div>
        <div class="form-button">
          <router-link to="/signup/finaliregistr" class="route">
          <button class="button" @click="submitinDatabase" :disabled="v$.password.$error && v$.emailAdress.$error && v$.nameUser.$error">Зарегистрироваться</button>
          </router-link>
          <div class="divider">или</div>
          <router-link to="/signin" class="route">
          <a href="#" class="button"> Войти</a>
          </router-link>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
  import {ref, reactive} from "vue";
  import {supabase} from "@/services/APIauthorization";
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength, maxLength } from '@vuelidate/validators'

  export default {
      name: "v-SignUp",
      data(){
        return{
          nameUser: '',
          emailAdress: '',
          password: '',
          confirmpassword: '',
        }
      },
      setup(){

        const nameUser = ref("");
        const emailAdress = ref("");
        const password = ref("");
        const confirmpassword = ref("")

        const state = reactive({
          nameUser: nameUser,
          emailAdress: emailAdress,
          password: password,
          confirmpassword: confirmpassword
        })
        const rules =
            {nameUser: {required, minLength: minLength(3), maxLength: maxLength(20)},
            emailAdress: {required, email},
            password: {required, minLength: minLength(6), maxLength: maxLength(16)},
            confirmpassword: {required}}


        const v$ = useVuelidate(rules, state, { $lazy: true, $autoDirty: true, })

        const submitinDatabase = async () => {
          try {
            const {error} = await supabase.auth.signUp({
              email: emailAdress.value,
              password: password.value,
              options: {
                data:{
                  first_name: nameUser.value
                }
              }
            });
            if (error) throw error
          }catch (error){
            console.log(error.error_description || error.message)
          }
        }
        return {
          nameUser,
          emailAdress,
          password,
          state,
          v$,
          submitinDatabase
        }

      },
      computed:{
        confirmPassword(){
          try {
            if (this.confirmpassword === this.password){
              return true
            }else {
              return false
            }
          }catch (e){
            console.log(e)
          }
        }
      },
  }
</script>

<style scoped>
  .container {
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
  .form-field>h1{
    color: red;
    font-size: 15px;
    text-align: center;
    margin-bottom: 0px;
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
  .form-title {
    text-align: center;
    color: #30507D;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 38px;
  }
  .form-field {
    padding-bottom: 5px;
    margin-bottom: 7px;
  }
  .form-button>.route{
    font-weight: bold;
    font-size: 14px;
    display: block;
    height: 45px;
    border-radius: 5px;
    background: #247FFF;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
  }
  .form-button>.route>.button.button {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    background: #247FFF;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .form-button>.button{
    font-weight: bold;
    font-size: 14px;
    display: block;
    height: 45px;
    border-radius: 5px;
    background: #247FFF;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
  }
  .form-button>.route>.button:hover {
    background: #E2E6F0;
    color: #fff;;
  }
  .form-button>button {
    text-decoration: none;
  }
  .form-button>a {
    color: #C6CFDC;
    background: #F2F6FF;
  }
  .form-button>a:hover {
    background: #E2E6F0;
    color: #fff;
  }
  .form-button>.divider {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #405D87;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>