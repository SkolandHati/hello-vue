<template>
    <form action="#" method="post" target="_blank">
      <h1 v-if="!defaultSetting">Заполните все поля и заказывайте товары в один клик!</h1>
      <fieldset class="block-inputs" :class="{atherSetting: defaultSetting}">
        <inputModul :userDatas="user" @updateDataUser="loggersCounts"/>
        <div v-if="!defaultSetting" class="submit-button">
          <button type="submit" :disabled="dataValidity" @click="submitUserInformation">Сохранить данные</button>
        </div>
      </fieldset>
    </form>
</template>

<script>
  import inputModul from "@/components/Shared-Components/v-input.vue"
  import {mapGetters, mapActions} from "vuex";
  import {ref} from "vue";

  export default {
    name: 'v-UserData',
    components:{
      inputModul
    },
    props:{
      defaultSetting:{
        type: Boolean
      }
    },
    setup(){

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
          console.log(state_object)
          //await this.setterUserData(state_object)
        }catch (e){
          Promise.reject(e)
        }
      }
      return {
        submitUserInformation
      }

    },
    data(){
      return{
        updateUserData: null
      }
    },
    computed:{
      ...mapGetters({
        user: 'user/USERINSYSTEM'
      }),
      dataValidity(){
        if (this.updateUserData !== null) {
            for (let i = 0; Object.keys(this.updateUserData).length > i; i++){
              console.log(Object.values(this.updateUserData))
            }
        }else {
          return false
        }
      }
    },
    mounted() {
      this.loadData()
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
      loggersCounts(someData){
        if (someData){
          this.updateUserData = someData
        }
      },
      async submitUserInformation(){
        try {
          if (this.updateUserData !== null){
            const state_object = {
              'user_id': await this.user.user_id,
              'login_user': login,
              'first_user_name': first_name,
              'last_user_name': last_name,
              'email_user': email,
              'number_phone_user': number_phone,
              'cart_bank_user': cart_bank
            }
            console.log(state_object)
          }
        }catch (e){
          Promise.reject(e)
        }
      }
    },
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
  form>.block-inputs.atherSetting{
    width: 100%;
  }
  form>.block-inputs>.submit-button>button{
    margin: 10px;
    width: 350px;
    height: 35px;
    margin-left: 230px;
    margin-top: 15px;
  }
</style>