<template>
    <div class="search">
        <form action="" method="get">
            <span class="span-search">
                <input class="panel-search"
                       v-model="data_search"
                       v-on:focus="active = true"
                       v-on:blur="onBlur"
                       placeholder="Поиск по сайту..."
                       type="search">
                <button class="fa-thin" type="submit"></button>
            </span>
        </form>
        <div class="result" :class="{isActive: active}" v-if="!!data_search ">
          <span class="search-inputs" @click="goNextCatalog(data_search)"> Найти: {{data_search}}</span>
        </div>
        <div class="block" :class="{isActive: active}" v-if="getBrendProducts">
            <a class="header">Возможно вы ищите:</a>
            <ul class="container-brend" v-for="item in getBrendProducts" @click="goNextCatalog(item.brend_Name)">
              <li>{{item.brend_Name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  export default {
    name: "v-SearchModull",
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
      searchInDatabase(){
        const result = this.getBrendProducts.find(item => item.brend_Name === this.data_search)
        if (result){
          return result.brend_Name
        }
      },
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
    .search>form { 
        display: flex;
    }
    .span-search{
        display: flex;
        height: 50px;
        width: 650px;
        padding-left: 40%;
        border-radius: 5px;
    }
    .span-search>input{
        width: 300px;
        height: 30px;
        margin-top: 10px;
        border: 2px solid #7BA7AB;
        border-radius: 5px 0px 0px 5px;
        outline: none;
        background: #edf8ff;
    }
    .fa-thin {
        margin-top: 10px;
        height: 30px;
        width: 30px;
        background: #7BA7AB;
        border: 2px solid #7BA7AB;
        border-radius: 0px 5px 5px 0px;
        cursor: pointer;
    }
    .span-search>button:before {
        content: "\f002";
        font-family: FontAwesome;
        font-size: 16px;
        color: #ffffff;
    }
    .result{
      display: none;
    }
    .result.isActive{
      display: block;
      left: 260px;
      width: 46%;
      padding: 15px;
      padding-right: 0px;
      padding-left: 0px;
      position: relative;
      z-index: 0;
      background-color: black;
      text-align: center;
      font-size: 15px;
      color: #989898;
    }
    .search-inputs:hover{
      text-align: center;
      cursor: pointer;
      padding-left: 65px;
      padding-right: 65px;
      padding-bottom: 10px;
      padding-top: 10px;
      border-radius: 3px;
      background-color: rgb(57, 73, 82);
    }
    .block{
      display: none;
    }
    .block.isActive{
      left: 260px;
      width: 46%;
      display: block;
      border-radius: 0 0 5px 5px;
      padding-bottom: 10px;
      background: rgb(57, 73, 82);
      position: relative;
      z-index: 0;
      transition: top 1s ease-out 0.5s;
    }
    .block>.header{
      display: block;
      width: 80%;
      height: 20px;
      padding: 15px;
      padding-left: 30px;
      padding-bottom: 5px;
      text-align: center;
      color: #edf8ff;
    }
    .container-brend{
      cursor: pointer;
      text-align: center;
      padding: 10px;
      margin: 3px;
      border: 2px solid #989191;
      border-radius: 5px;
      list-style-type:none;
    }
    .container-brend>a{
      color: #edf8ff;
    }
    .container-brend>li{
      color: #edf8ff;
    }
    .container-brend:hover{
      background-color: #8f8f8f;
    }
</style>