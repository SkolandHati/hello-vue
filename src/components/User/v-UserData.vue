<template>
    <form action="#" method="post" target="_blank">
      <h1 v-if="!defaultSetting">Заполните все поля и заказывайте товары в один клик!</h1>
      <fieldset class="block-inputs"
                :class="{atherSetting: defaultSetting}">
        <div class="inputs" v-for="(item, i) in labels">
          <v-input :modelValue="state[Object.keys(this.state)[i]]"
                   v-model="state[Object.keys(this.state)[i]]"
                   :item="item"
                   :defSetting="defaultSetting"
                   />
        </div>
        <div class="block-native">
          <div class="nav"
               :class="{active: !!dataValidity}">
            <p class="native" >Заполните все поля *</p>
          </div>
          <div class="submit-button">
            <button type="submit"
                    :disabled="dataValidity === false"
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
    emits: "sendDataUser",
    data(){
      return{
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
        for (let i = 0; Object.keys(this.state).length > i; i++){
          if (!Object.values(this.state)[i]){
            return false
          }
        }
        return true
      },
      buttonTxt(){
        if (this.defaultSetting){
          return this.buttonText = 'Заказать'
        }else {
          return this.buttonText = 'Сохранить данные'
        }
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
      async submitUserInformation(){
        try {
          await this.user
          let data = this.dataValidity
          if (data && this.user){
            this.state.id = this.user.user_id
            await this.setterUserData(this.state)
            if (this.defaultSetting){
              await this.$emit('sendDataUser',this.state)
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