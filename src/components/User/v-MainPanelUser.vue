<template>
  <div id="q-app">
      <div class="bg-blue-grey-6 text-white">
        <q-toolbar inset>
          <q-breadcrumbs active-color="white" style="font-size: 22px">
            <q-breadcrumbs-el class="home" label="TopBrend'." icon="home" @click="goHomePage"></q-breadcrumbs-el>
          </q-breadcrumbs>
        </q-toolbar>
        <div class="search-panel">
          <vSearchPanel ></vSearchPanel>
        </div>
        <div class="user-buttons">
          <vUI_UserButtons></vUI_UserButtons>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import vSearchPanel from '../SearchPanel/v-SearchModull.vue';
  import vUI_UserButtons from './v-UI-UserButtons.vue';
  export default defineComponent({
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
  })
</script>

<style scoped>
    #q-app{
      min-height: 50px;
    }
    .bg-blue-grey-6 {
      display: flex;
    }
    .home{
      margin-left: 100px;
    }
    .home:hover{
      cursor: pointer;
      color: #3b3a3a;
    }
    .user-buttons{
     margin-right: 25px;
    }
</style>