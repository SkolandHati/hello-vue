<template>
  <div id="block" class="block-input"
       :class="{atherSetting: defaultSetting}"
       v-for="(item, i) in labels">
    <label class="label">{{item}}</label>
    <input class="input" type="text"
           v-model="state[Object.keys(this.state)[i]]"
           :placeholder="item" required>
  </div>
</template>

<script>
  export default {
    name: 'v-input',
    props:{
      defaultSetting:{
        type: Boolean
      },
      userDatas: {
        type: Object,
        required: true
      }
    },
    setup(){
      const labels = ['Логин', 'Имя', 'Фамилия', 'Email', 'Тел.Номер', 'Банк.Карта']
      return {
        labels,
      }
    },
    created() {
      this.state.login = this.userDatas.user_login || ''
      this.state.first_name = this.userDatas.user_first_name || ''
      this.state.last_name = this.userDatas.user_last_name || ''
      this.state.email = this.userDatas.user_email || ''
      this.state.number_phone = this.userDatas.user_number_phone || ''
      this.state.cart_bank = this.userDatas.user_cart_bunk_number || ''
    },
    data(){
      return{
        state: {
          login: '',
          first_name: '',
          last_name: '',
          email: '',
          number_phone: '',
          cart_bank: ''
        }
      }
    },
    mounted() {
      console.log()
    },
    methods:{

    }
  }

</script>

<style scoped>
  .block-input{
    display: flex;
    width: 500px;
    height: 50px;
    margin-top: 17px;
    margin-left: 150px;
    border: 1.5px solid #6e6d6d;
    border-radius: 7px;
  }
  .label{
    display: block;
    width: 100px;
    font-size: 18px;
    margin: 15px;
  }
  .input{
    width: 60%;
    height: 27px;
    text-align: center;
    margin-top: 10px;
    margin-left: 25px;
  }
  form>.block-inputs>#block>.input{
    margin-left: 10px;
  }

</style>