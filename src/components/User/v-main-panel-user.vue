<template>
    <h1 @click="$router.push({name: 'v-HomePage'})">TopBrend'.</h1>
    <v-search-panel/>
    <v-btn-user-basket-love/>
</template>

<script>
    import vSearchPanel from './v-SearchModull.vue';
    import vBtnUserBasketLove from './v-btn-user-basket-love.vue';
    export default {
        name: "v-main-panel-user",
        components: {
            vSearchPanel,
            vBtnUserBasketLove,
        },
    }
</script>

<style scoped>
    h1{
        color: rgb(235, 239, 241);
        font-size: 30px;
        margin: 0;
        padding-left: 5%;
        padding-top: 7px;
        transition: .5ms;
    }
    h1:hover{
      cursor: pointer;
      transition: .5s;
      color: #50bdd5;
    }
    h1:active {
      color: #000;
      transition: .07s;
    }
</style>