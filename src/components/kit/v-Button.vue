<template>
  <div class="block-button">
    <button>{{dataButton}}</button>
    <span class="confirm" :class="{active}"></span>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props:{
      dataButton:{
        type: String,
        require:true
      },
      active:{
        type: Boolean,
        require: true
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
  width: 140px;
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
  margin-left: 5px;
  width: 25px;
  height: 25px;
  border: 2px solid #258804;
  background-color: #258804;
  border-radius: 50%;
}
</style>