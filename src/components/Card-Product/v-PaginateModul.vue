<template>
  <div class="container__paginate">
    <ul class="pagination justify-content-center" v-for="(item, i) in countesPage" :key="item[i]">
      <li class="item" :class="{setClass}"  @click.prevent="setClass">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'v-PaginateModul',
    props:{
      productsArr:{
        type: Array,
        required: true
      },
      pageNumb:{
        type: Number,
        required: true
      }
    },
    data(){
      return {
        numb: null,
        Active: false
      }
    },
    methods:{
      setClass(){
        return this.Active = true
      }
    },
    computed: {
      countesPage() {
        return Math.ceil(localStorage.length / 6)
      },
      selected: {
        get: function () {
          return this.modelValue || this.innerValue;
        },
        set: function (newValue) {
          this.innerValue = newValue;
        },
      }
    },
    mounted() {
    }
}





</script>

<style scoped>

  .container__paginate {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
  }
  .container__paginate>.pagination>.item{
    display: flex;
    width: 30px;
    height: 25px;
    padding-top: 4px;
    justify-content: center;
    border: 2px solid skyblue;
    border-radius: 115%;
  }

  .container__paginate>.pagination>.item:hover{
    cursor: pointer;
    background-color: skyblue;
  }
  .container__paginate>.pagination>.item.Active{
    background-color: skyblue;
  }
</style>

