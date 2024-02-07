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
  import {defineComponent, SetupContext, defineEmits} from "vue"
  import {Nullable} from "@/interfaces/Type/Types";
  export default defineComponent({
    name: 'v-PaginateModul',
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
        number_page: null as Nullable<number|undefined>,
      }
    },
    setup(props, { emit } ) {
      const navigate = (page:number) => {
        if (props.modelValue !== page) {
          emit('pagechanged', page)
        }
      }
      return {
        navigate
      }
    },
    mounted() {
      this.initialState()
    },
    methods:{
      initialState(){
        this.number_page = this.modelValue
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

