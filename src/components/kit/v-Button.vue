<template>
  <div class="block-button">
    <button @click="onClick" :class="{anotherSetting}">{{dataButton}}</button>
    <span class="confirm" :class="{active}"></span>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    data(){
      return {
        active: false
      }
    },
    props:{
      dataButton:{
        type: String,
        require:true
      },
      anotherSetting:{
        type: Boolean,
        default:false
      }
    },
    methods:{
      onClick(){
        this.active = true
        setTimeout(() => {return this.active = false}, 500)
      }
    }
  }

</script>

<style scoped>
  .block-button{
    display: flex;
  }
  button{
    display: block;
    min-width: 140px;
    height:40px;
    margin: 15px;
    margin-right: 0px;
    margin-left: 25px;
    margin-top: 20px;
    background-color: #a4c9a4;
    border: 0;
    border-radius: 7px;
  }
  button:hover{
    background-color: #7fda7f;
    cursor: pointer;
  }
  .confirm{
    display: none;
  }
  .confirm.active{
    display: block;
    margin-top: 25px;
    margin-left: 1px;
    width: 25px;
    height: 25px;
    border: 2px solid #258804;
    background-color: #258804;
    border-radius: 50%;
  }
  .anotherSetting{
    background-color: #6e6d6d;
  }
  .anotherSetting:hover{
    background-color: #a8a8a8;
  }
</style>