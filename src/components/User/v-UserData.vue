<template>
    <form action="#" method="post" target="_blank">
      <h1 v-if="!defaultSetting">Заполните все поля и заказывайте товары в один клик!</h1>
      <fieldset class="block-inputs" :class="{atherSetting: defaultSetting}">
        <div id="block" class="block-first-name" :class="{atherSetting: defaultSetting}">
          <label id="label" for="login">Логин:*  </label>
          <input class="input" type="text" name="login"
                 :value="user.user_id !== undefined ? user.user_login: login || ''"
                 placeholder="Логин" id="login" required>
        </div>
        <div id="block" class="block-first-name" :class="{atherSetting: defaultSetting}">
          <label id="label" for="first_name">Имя:*  </label>
          <input class="input" type="text" name="first_name"
                 v-model="first_name"
                 placeholder="Иван " id="first_name" required>
        </div>
        <div id="block" class="block-last-name" :class="{atherSetting: defaultSetting}">
          <label id="label" for="last_name">Фамилия:*  </label>
          <input class="input" type="text" name="last_name"
                 v-model="last_name"
                 placeholder="Иванов " id="last_name" required>
        </div>
        <div id="block" class="block-email" :class="{atherSetting: defaultSetting}">
          <label id="label" for="email">E-mail:*  </label>
          <input class="input" type="email" name="mail"
                 placeholder="ivanov@gmail.com" id="email" required>
        </div>
        <div id="block" class="block-phone-number" :class="{atherSetting: defaultSetting}">
          <label id="label" for="number">Тел.Номер:*  </label>
          <input class="input" type="tel" name="numb"
                 v-model="number_phone"
                 placeholder="88005553535" id="number" required>
        </div>
        <div id="block" class="bank-number" :class="{atherSetting: defaultSetting}">
          <label id="label" for="bank-number">Карта Банка:*  </label>
          <input class="input" type="number" name="numb"
                 v-model="cart_bank"
                 placeholder="8800-5553-5355-3535" id="bank-number" required>
        </div>
        <div v-if="!defaultSetting" class="submit-button">
          <button type="submit">Сохранить данные</button>
        </div>
      </fieldset>
      {{login}}
    </form>
</template>

<script>

  import {mapGetters, mapActions} from "vuex";
  import {reactive, ref} from "vue";

  export default {
    name: 'v-UserData',
    props:{
      defaultSetting:{
        type: Boolean
      }
    },
    data(){
      return {
          us_login: null,
          us_first_name: null,
          us_last_name: null,
          us_email: null,
          us_number_phone: null,
          us_cart_bank: null
      }
    },
    methods:{
      ...mapActions({
        getUserData: 'user/getUser',
        setterUserData: 'user/setUserData'
      }),
      async loadData(){
        try {
          await this.getUserData()
        }catch (e){
          Promise.reject(e)
        }
      },
    },
    computed:{
      ...mapGetters({
        user: 'user/USERINSYSTEM'
      })
    },
    setup(){

      const login = ref('')
      const first_name = ref('')
      const last_name = ref('')
      const email = ref('')
      const number_phone = ref('')
      const cart_bank = ref('')

      const submitUserInformation = async () => {
        try {
          const state_object = {
            'user_id': await this.user.user_id,
            'login_user': login,
            'first_user_name': first_name,
            'last_user_name': last_name,
            'email_user': email,
            'number_phone_user': number_phone,
            'cart_bank_user': cart_bank
          }
          await this.setterUserData(state_object)
        }catch (e){
          Promise.reject(e)
        }
      }
      return {
        login,
        first_name,
        last_name,
        email,
        number_phone,
        cart_bank
      }

    },
    mounted() {
      this.loadData()
      console.log(this.login)
    }
  }

</script>

<style scoped>

  form>h1{
    margin-left: 190px;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
    font-size: 22px;
  }
  form>.block-inputs{
    margin-top: 15px;
    margin-left: 50px;
    width: 108%;
    height: 85%;
    border-radius: 5px;
  }
  form>.block-inputs>#block{
    width: 500px;
    height: 50px;
    margin-top: 17px;
    margin-left: 150px;
    border: 1.5px solid #6e6d6d;
    border-radius: 7px;
  }
  form>.block-inputs>#block.atherSetting{
    margin-left: 70px;
  }
  form>.block-inputs.atherSetting{
    width: 100%;
  }
  form>.block-inputs>#block>#label{
    font-size: 18px;
    margin: 15px;
  }
  form>.block-inputs>#block>.input{
    width: 60%;
    height: 27px;
    text-align: center;
    margin-top: 10px;
    margin-left: 25px;
  }
  form>.block-inputs>#block>#login{
    margin-left: 45px;
  }
  form>.block-inputs>#block>#first_name{
    margin-left: 60px;
  }
  form>.block-inputs>#block>#last_name{
    margin-left: 22px;
  }
  form>.block-inputs>#block>#email{
    margin-left: 43px;
  }
  form>.block-inputs>#block>#number{
    margin-left: 10px;
  }
  form>.block-inputs>#block>#bank-number{
    margin-left: 0px;
  }
  form>.block-inputs>.submit-button>button{
    margin: 10px;
    width: 350px;
    height: 35px;
    margin-left: 230px;
    margin-top: 15px;
  }
</style>