<template>
  <div class="container__paginate">
    <q-pagination
        :max="total_pages"
        v-model="numb"
        @click.prevent="navigate(numb)"
        direction-links
        unelevated
        color="green"
        active-color="amber"
    ></q-pagination>
  </div>
</template>

<script>
export default {
    name: 'v-PaginateModul',
    emits: 'pagechanged',
    props:{
      modelValue:{
        type: Number,
        require: true
      },
      total_pages:{
        type: Number,
        require: true
      }
    },
    data(){
      return {
        numb: this.modelValue,
      }
    },
    methods:{
      navigate(page) {
        if (this.currentPage !== page) {
          this.$emit('pagechanged', page);
        }
      }
    },
}
</script>
<style scoped>
  :deep(.q-pagination){
    margin-bottom: 25px;
    justify-content: center;
  }
  :deep(.q-btn){
    margin-left: 20px;
    margin-right: 20px;
  }
</style>

