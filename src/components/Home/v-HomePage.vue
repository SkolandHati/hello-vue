<template>
    <div class="user-panel">
      <vMainPanelUser/>
    </div>
    <div class="contaner-homepage">
      <vCarusel></vCarusel>
      <div class="cards">
         <vCatalogProducts/>
      </div>
    </div>
</template>
<script lang="ts">
    import {defineComponent} from "vue";
    import vMainPanelUser from "@/components/User/v-MainPanelUser.vue"
    import vCarusel from "@/components/CaruselProduct/vCarusel.vue"
    import vCatalogProducts from "@/components/Card-Product/v-catalog-products.vue"
    export default defineComponent({
        name: "v-HomePage",
        components: {
            vCarusel,
            vCatalogProducts,
            vMainPanelUser
        },
    })
</script>
<style scoped>
    .user-panel{
      display: flex;
      background-color: rgb(57, 73, 82);
      width: 100%;
      height: 50px;
    }
    .contaner-homepage{
        display: flex;
    }
    .cards{
      display: block;
      width: 100%;
      margin-left: 10px;
    }
    h1{
        color: black;
        text-align: center;
        margin: 0;
        margin-top: 2px;
    }
</style>