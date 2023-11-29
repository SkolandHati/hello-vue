<template>
    <form action="#" method="post" target="_blank">
      <h1 v-if="!defaultSetting">Заполните все поля и заказывайте товары в один клик!</h1>
      <fieldset class="block-inputs"
                :class="{atherSetting: defaultSetting}">
        <div class="inputs" v-for="(item, i) in labels">
          <v-input :value="state[Object.keys(this.state)[i]]"
                   :item="item"
                   :defSetting="defaultSetting"
                   @input="loggersCounts"/>
        </div>
        <div class="block-native">
          <div class="nav"
               :class="{active: !!dataValidity}">
            <p class="native" >Заполните все поля *</p>
          </div>
          <div class="submit-button">
            <button type="submit"
                    :disabled="dataValidity === false && updateUserData !== null"
                    :class="{fix: !!dataValidity, setting: defaultSetting}"
                    @click.prevent="submitUserInformation">{{buttonTxt}}</button>
          </div>
        </div>
      </fieldset>
    </form>
</template>

<script>
  import vInput from "@/components/kit/v-input.vue"
  import {mapGetters, mapActions} from "vuex";
  export default {
    name: 'v-UserData',
    components:{
      vInput
    },
    props:{
      defaultSetting:{
        type: Boolean,
        default: false
      }
    },
    emits: ["sendDataUser"],
    data(){
      return{
        updateUserData: null,
        buttonText: null,
        state: {
          login: '',
          first_name: '',
          last_name: '',
          email: '',
          number_phone: '',
          cart_bank: ''
        },
        labels: ['Логин', 'Имя', 'Фамилия', 'Email', 'Тел.Номер', 'Банк.Карта']
      }
    },
    computed:{
      ...mapGetters({
        user: 'user/USERINSYSTEM'
      }),
      dataValidity(){
        if (this.updateUserData !== null) {
            for (let i = 0; Object.keys(this.updateUserData).length > i; i++){
              if (Object.values(this.updateUserData)[i] === null){
                return false
              }
            }
        }else {
          return false
        }
      },
      buttonTxt(){
        if (this.defaultSetting){
          return this.buttonText = 'Заказать'
        }else {
          return this.buttonText = 'Сохранить данные'
        }
      }
    },
    watch:{
      updateUserData(){
        this.loggersCounts()
      }
    },
    created() {
      this.state.login = this.user.user_login || ''
      this.state.first_name = this.user.user_first_name || ''
      this.state.last_name = this.user.user_last_name || ''
      this.state.email = this.user.user_email || ''
      this.state.number_phone = this.user.user_number_phone || ''
      this.state.cart_bank = this.user.user_cart_bunk_number || ''
    },
    mounted() {
      this.loadData()
      console.log(this.state)
    },
    methods:{
      ...mapActions({
        getUserData: 'user/getUser',
        setterUserData: 'user/setUserData'
      }),
      async loadData(){
        try {
          await this.getUserData()
        }catch(e) {
          console.log(e)}
      },
      loggersCounts(someData){
        if (someData){
          console.log(someData)
          this.updateUserData = someData
        }
      },
      async submitUserInformation(){
        try {
          await this.user
          if (this.updateUserData !== null && this.user !== null){
            this.updateUserData.id = this.user.user_id
            await this.setterUserData(this.updateUserData)
            if (this.defaultSetting){
              await this.$emit('sendDataUser',this.updateUserData)
            }
          }
        }catch (e){
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>

  h1{
    margin-left: 190px;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
    font-size: 22px;
  }
  .block-inputs{
    margin-top: 15px;
    margin-left: 50px;
    width: 108%;
    height: 85%;
    border-radius: 5px;
  }
  .atherSetting{
    width: 94%;
    margin-left: 35px;
  }
  .submit-button{
    position: relative;
    display: flex;
  }
  .block-native {
    display: flex;
  }
  .native{
    width: 160px;
    height: 21px;
    margin-top: 23px;
    margin-left: 50px;
  }
  .active{
    display: none;
    width: 160px;
    height: 21px;
  }
  .fix{
    margin-left: 245px;
  }
  button{
    position: relative;
    margin: 10px;
    width: 350px;
    height: 35px;
    margin-left: 35px;
    margin-top: 15px;
  }
  .setting{
    margin-left: 0px;
  }
</style>