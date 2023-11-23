<template>
  <div id="block" class="block-input"
       :class="{atherSetting: defaultSetting}"
       v-for="(item, i) in labels" :key="item[i]">
    <label class="label">{{item}}</label>
    <input class="input" type="text"
           v-model="state[Object.keys(this.state)[i]]"
           :placeholder="item" required>
    <span class="span-symbol-good" v-if="state[Object.keys(this.state)[i]] !== null">&#128504;</span>
    <span class="span-symbol-bad" v-else>&#10006;</span>
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
    emits: (["updateDataUser"]),
    setup(){
      const labels = ['Логин', 'Имя', 'Фамилия', 'Email', 'Тел.Номер', 'Банк.Карта']
      return {
        labels,
      }
    },
    created() {
      this.state.login = this.userDatas.user_login || null
      this.state.first_name = this.userDatas.user_first_name || null
      this.state.last_name = this.userDatas.user_last_name || null
      this.state.email = this.userDatas.user_email || null
      this.state.number_phone = this.userDatas.user_number_phone || null
      this.state.cart_bank = this.userDatas.user_cart_bunk_number || null
    },
    data(){
      return{
        state: {
          login: null,
          first_name: null,
          last_name: null,
          email: null,
          number_phone: null,
          cart_bank: null
        }
      }
    },
    computed:{
      salary() {
        return this.state.login + ' '
            + this.state.first_name + ' '
            + this.state.last_name + ' '
            + this.state.email + ' '
            + this.state.number_phone + ' '
            + this.state.cart_bank
      }
    },
    watch:{
      salary(){
        this.$emit('updateDataUser',this.state)
      }
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
  .input{
    margin-left: 10px;
  }
  .span-symbol-good,.span-symbol-bad{
    width: 20px;
    height: 20px;
    margin: 10px;
    margin-top:15px;
    text-align: center;
    //padding-top: 5px;
    border: 2px solid #4b4b4b;
    border-radius: 50%;
  }
  .span-symbol-good{
    background-color: #9edc86;
  }
  .span-symbol-bad{
    background-color: #e71f1f;
    border: 2px solid #6e6d6d;
  }

</style>