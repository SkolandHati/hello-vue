<template>
  <div class="container">
    <div class="item">
      {{item}}
    </div>
    <div id="block" class="block-input">
      <input class="inpt"
             @input="$emit('update:modelValue', $event.target.value)"
             :value="modelValue"
             :placeholder="item">
    </div>
    <q-icon class="icon" v-if="!!modelValue"
            style="color: green"
            name="check_circle_outline"></q-icon>
    <q-icon class="icon" v-else
            style="color: red"
            name="close"></q-icon>
  </div>
</template>

<script>
  export default {
    name: 'v-input',
    model: {
      prop: 'modelValue',
      event: 'update:modelValue'
    },
    props:{
        modelValue: {
        type: String,
        required: true
      },
      item:{
        type: String,
        required: true
      },
    },
  }

</script>

<style scoped>
  .container{
    display: flex;
    margin-left: 90px;
  }
  .item{
    position: relative;
    max-width: 100px;
    width: 100px;
    max-height: 50px;
    margin: 15px;
    margin-right:5px;
    padding-top: 10px;
  }
  .block-input{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 400px;
    margin: 15px;
    margin-left:25px;
    border-radius: 5px;
    background: $input-background;
      &:after {
        content: "";
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 2px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        background-position: 0% 0%;
        background: linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6);
        background-size: 500% auto;
        animation: gradient 3s linear infinite;
      }
    }
  $input-background: rgba(57, 63, 84, 0.8);
  $input-text-inactive: #7881A1;
  $input-text-active: #BFD2FF;
  @keyframes gradient {
    0%{background-position:0 0}
    100%{background-position:100% 0}
  }
  .block-input input{
    text-align: center;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    flex-grow: 1;
    color: $input-text-active;
    font-size: 17px;
    line-height: 2.4rem;
    vertical-align: middle;
    border-radius: 2px;
  }
  .block-input input:focus{
    outline:none;
  }
  .icon{
    padding-top: 20px;
    font-size: 30px;
  }
</style>