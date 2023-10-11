<template>
    <div class="arrow-left">
        <span class="left"></span>
    </div>
    <div class="container-cardmap">
      <span class="left"></span>
        <caruselMap
        :product="oneproduct"/>
    </div>
    <div class="arrow-rigth">
      <span class="rigth"></span>
    </div>
</template>
<script>
    import CaruselMap from './caruselMap.vue'
    export default {
        name: "vCarusel",
        components: {
            CaruselMap
        },
        props: {
          oneproduct: {
            type: Object,
            require: true,
          }
        }
    }
</script>
<style>
    .container-cardmap{
      display: block;
    }
    .arrow-left>.left{
      margin: 10px;
      margin-right: 0px;
      border: solid #3998c2;
      border-width: 0px 5px 5px 0;
      display: inline-block;
      padding: 10px;
      transform: rotate(135deg);
    }
    .arrow-rigth>.rigth{
      margin: 10px;
      margin-left: 0px;
      border: solid #3998c2;
      border-width: 0px 5px 5px 0;
      display: inline-block;
      padding: 10px;
      transform: rotate(315deg);
    }
</style>