<template>
    <h1 @click="goHomePage">TopBrend'.</h1>
    <v-search-panel/>
    <vUI_UserButtons/>
</template>

<script>
    import vSearchPanel from './v-SearchModull.vue';
    import vUI_UserButtons from './v-UI-UserButtons.vue';
    export default {
        name: "v-main-panel-user",
        components: {
            vSearchPanel,
            vUI_UserButtons,
        },
        methods:{
          goHomePage(){
            return this.$router.push({name:'v-HomePage'})
          }
        }
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