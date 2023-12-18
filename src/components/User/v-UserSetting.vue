<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="container-user-setting" style="display: flex">
    <div class="block-buttons" style="width: 35%; margin: 20px">
        <q-btn class="button"
               :class="{active_data}"
               style="width:80%;
               height: 50px;
               font-size: 15px;
               display: block"
               @click="fakePaginate">
          <div>Информация пользователя</div>
        </q-btn>
        <q-btn class="button"
               :class="{active_order}"
               style="width:80%;
               height: 50px;
               font-size: 18px;
               display: block"
               @click="fakePaginate">
          <div>Заказы</div>
        </q-btn>
    </div>
    <div class="user-data" :class="{active_data}" style="width: 65%; float: right">
      <vUserData></vUserData>
    </div>
    <div class="user-order" :class="{active_order}" style="width: 65%; float: right">
      <vOrder></vOrder>
    </div>
  </div>
</template>

<script>
  import vMainPanelUser from "@/components/User/v-MainPanelUser.vue"
  import vUserData from "@/components/User/v-UserData.vue"
  import vOrder from "@/components/Order/v-Order.vue"
  export default {
    name: 'v-UserSetting',
    components:{
      vMainPanelUser,
      vUserData,
      vOrder
    },
    data(){
      return {
        active_data: true,
        active_order: false
      }
    },
    methods:{
      fakePaginate(){
        if (this.active_data){
          this.active_data = false
          return this.active_order = true
        }
        else {
          this.active_order = false
          return this.active_data = true
        }
      },
    }
  }

</script>

<style scoped>
  .block-buttons{
    padding: 45px;
  }
  .button{
    margin: 20px;
    margin-bottom: 40px;
  }
  :deep(.button){
    background-color: #1a6c80;
    color:white;
  }
  :deep(.button.active_data){
    background-color: #2aaac5;
  }
  :deep(.button.active_data){
    background-color: #2aaac5;
    border: 1px solid dimgray;
  }
  :deep(.button.active_order){
    background-color: #2aaac5;
    border: 1px solid dimgray;
  }
  .user-data{
    display: none;
  }
  .user-order{
    display: none;
  }
  .user-data.active_data{
    margin: 15px;
    display: block;
  }
  .user-order.active_order{
    margin: 15px;
    display: block;
  }
</style>