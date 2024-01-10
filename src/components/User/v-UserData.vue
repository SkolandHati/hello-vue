<template>
    <form action="#" method="post" target="_blank">
      <q-banner class="banner" :class="{defaultSetting}">{{bannerTxt}}</q-banner>
      <fieldset class="block-inputs">
        <div v-for="(item, i) in labels" :key="i">
          <vInput :item="item"
                  :modelValue="state[Object.keys(this.state)[i]]"
                  v-model="state[Object.keys(this.state)[i]]"></vInput>
        </div>
        <div class="block-submit"
             style="display: flex; width: 100%; justify-content: center">
          <q-btn color="secondary"
                 style="width: 40%"
                 :label="buttonTxt" @click.prevent="submitUserInformation"></q-btn>
        </div>
      </fieldset>
    </form>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {StateUserData} from "@/interfaces/InterfacesState"
  import vInput from "@/components/kit/v-input.vue"
  import {mapGetters, mapActions} from "vuex";
  import {Nullable} from "@/interfaces/Type/Types";
  export default defineComponent({
    name: 'v-UserData',
    components:{
      vInput
    },
    props:{
      defaultSetting:{
        type: Boolean,
        default: false
      },
    },
    emits:
        {orderPush: (user_id: string)=> true},
    data(){
      return{
        buttonText: null as Nullable<string>,
        bannerText: null as Nullable<string>,
        state: {
          login: '',
          first_name: '',
          last_name: '',
          email: '',
          number_phone: '',
          cart_bank: ''
        } as StateUserData,
        labels: ['Логин', 'Имя', 'Фамилия', 'Email', 'Тел.Номер', 'Банк.Карта']
      }
    },
    computed:{
      ...mapGetters({
        user: 'user/USERINSYSTEM'
      }),
      dataValidity(): Nullable<boolean>{
        for (let i = 0; Object.keys(this.state).length > i; i++){
          if (!Object.values(this.state)[i]){
            return false
          }
        }
        return true
      },
      buttonTxt(): Nullable<string>{
        if (this.defaultSetting){
          return this.buttonText = 'Оформить заказ'
        }else {
          return this.buttonText = 'Сохранить данные'
        }
      },
      bannerTxt(): Nullable<string>{
        if (this.defaultSetting){
          return this.bannerText = "Для оформления заказа все поля должны быть заполнены"
        }else {
          return this.bannerText = "Заполните все поля и заказывайте товары в один клик!"
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
        } catch(e) {
          console.error(e)
        }
      },
      async submitUserInformation(){
        try {
          await this.user
          let data = this.dataValidity
          if (data && this.user){
            this.state.id = this.user.user_id
            if(!this.user.id){
              await this.setterUserData(this.state)
            }
          }
          if (this.defaultSetting){
            await this.$emit('orderPush', this.user.user_id)
          }
        } catch (e){
          console.error(e)
        }
      },
    },
  })
</script>
<style scoped>
  .banner{
    margin-top: 10px;
    text-align: center;
    background-color: #3b899a;
    border-radius: 7px 7px 0px 0px;
    color: #f5f3f3;
  }
</style>