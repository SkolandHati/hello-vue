<template>
  <div class="image_container" :class="{settingBusketPage}">
    <img :src="require(`../assets/images/${productBrend}/${imageProduct}`)" alt="images">
  </div>
</template>

<script>
  export default {
    name: 'ImageComponent',
    props:{
      productBrend: {
        type: String,
        require: true
      },
      imageProduct:{
        type:String,
        require: true
      },
      settingBusketPage:{
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .settingBusketPage>img{
    width: 225px;
    height: 200px;
    padding: 5px;
    padding-right: 0px;
    padding-left: 0px;
    border: 2px solid #3B5983;
    border-radius: 1px;
  }
</style>