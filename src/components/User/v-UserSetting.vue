<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="container-user-setting">
    <div class="choice">
      <h1 class="setting" :class="{active_data}" id="act" @click="fakePaginate">Настройки</h1>
      <h1 class="order" :class="{active_order}" id="act" @click="fakePaginate">Заказы</h1>
    </div>
    <div class="user-data" :class="{active_data}">
      <v-user-data/>
    </div>
    <div class="user-order" :class="{active_order}">
      <v-order/>
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
      }
    }
  }

</script>

<style scoped>
  .user-panel{
    display: flex;
    background-color: rgb(57, 73, 82);
    width: 100%;
    height: 50px;
  }
  .container-user-setting{
    display: flex;
    width: 93.5%;
    height: 550px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 40px;
    margin-top: 20px;
  }
  .user-data{
    display: none;
  }
  .active_data{
    display: block;
  }
  .choice {
    margin: 15px;
  }
  h1{
    text-align: center;
  }
  #act{
    width: 260px;
    max-width: 260px;
    height: 50px;
    max-height: 50px;
    margin-top: 35px;
    margin-left: 25px;
    padding-top: 10px;
    border-radius: 7px;
    border: 1px solid transparent;
    color: #3b3b3b;
    background-color: #989898;
  }
  #act:hover{
    border: 1px solid #595959;
    cursor: pointer;
    background-color: #edf8ff;
  }
  #act.active_data{
    background-color: #d8f1d4;
    border: 1px solid #595959;
  }
  #act.active_order{
    width: 100%;
    height: 100%;
    background-color: #d8f1d4;
    border: 1px solid #595959;
  }
  .user-order{
    display: none;
  }
  .active_order{
    display: block;
  }
</style>