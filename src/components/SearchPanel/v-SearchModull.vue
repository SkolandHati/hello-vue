<template >
  <div class="q-gutter-y-md column">
    <q-input class="search"
             v-model="data_search"
             v-on:focus="active = true"
             v-on:blur="onBlur"
             placeholder="Поиск по сайту..." rounded outlined>
      <template class="input" v-slot:append>
        <q-icon class="icon"
                name="search"
                @click="goNextCatalog(data_search)"></q-icon>
      </template>
    </q-input>
  </div>
  <div class="list-brend" :class="{isActive: active}" v-if="active && getBrendProducts">
    <q-item clickable v-close-popup class="item-serarch" v-if="!!data_search">
      <q-item-section>
        <q-item-label @click="goNextCatalog(data_search)">Найти: {{data_search}}</q-item-label>
      </q-item-section>
    </q-item>
    <a class="header">Возможно вы ищите:</a>
    <q-list class="list"
            :class="{isActive: active}"
            v-for="item in getBrendProducts"
            @click="goNextCatalog(item.brend_Name)">
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>{{item.brend_Name}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  export default {
    name: "SearchModull",
    data(){
      return{
        data_search: null,
        active: false
      }
    },
    computed:{
      ...mapGetters({
        getBrendProducts: 'products/BRENDSINFO'
      }),
    },
    mounted() {
      this.loadData()
    },
    methods:{
      ...mapActions({
        getterBrends: "products/loadBrendsInfo"
      }),
      async loadData(){
        try {
          await this.getterBrends()
        }catch (e){
          console.log(e)
        }
      },
      onBlur(){
        setTimeout(() => {return this.active = false}, 1000)
      },
      goNextCatalog(data){
        if (data){
          this.$router.push({name:'v-BrendsPageProducts', params: {brend: data}})
        }
      }
    },
  }
</script>

<style scoped>
  .q-gutter-y-md{
    width: 650px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .search{
    width: 400px;
  }
  .list-brend{
    display: block;
  }
  .list-brend.isActive{
    width: 20%;
    display: block;
    z-index: 999;
    position: absolute;
    margin-left: 15px;
    background-color: #607d8b !important;
    border-radius: 4px;
  }
  .item-serarch{
    width: 80%;
    display: block;
    border-radius: 5px 5px 5px 5px;
    margin: 10px;
    background: rgb(57, 73, 82);
    padding-top: 15px;
    z-index: 0;
    transition: top 1s ease-out 0.5s;
  }
  .list{
    width: 80%;
    display: block;
    border-radius: 5px 5px 5px 5px;
    margin: 10px;
    background: rgb(57, 73, 82);
    position: relative;
    z-index: 1;
    transition: top 1s ease-out 0.5s;
  }
  a{
    margin: 10px;
  }
  .icon{
    cursor: pointer;
  }
</style>