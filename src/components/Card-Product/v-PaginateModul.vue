<template>
  <div class="container__paginate">
    <q-pagination
        :max="total_pages"
        v-model="number_page"
        @click.prevent="navigate(number_page)"
        direction-links
        unelevated
        color="green"
        active-color="amber"
    ></q-pagination>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  export default defineComponent({
    name: 'v-PaginateModul',
    emits: {
      pagechanged: (page: number) => true
    },
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
        number_page: this.modelValue as number,
      }
    },
    methods:{
      navigate(page: number): void {
        if (this.modelValue !== page) {
          this.$emit('pagechanged', page);
        }
      }
    },
  })
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

