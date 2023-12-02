<template>
  <div id="block" class="block-input"
       :class="{atherSetting: defSetting}">
    <label class="label">{{item}}</label>
    <input class="input" type="text"
           @input="$emit('update:modelValue', $event.target.value)"
           :value="modelValue"
           :placeholder="item" required>
    <span class="span-symbol-good" v-if="!!modelValue">&#128504;</span>
    <span class="span-symbol-bad" v-else>&#10006;</span>
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
      defSetting:{
        type: Boolean,
        default: false
      },
    },
  }

</script>

<style scoped>
  .block-input{
    display: flex;
    width: 500px;
    height: 50px;
    margin-top: 17px;
    margin-left: 150px;
    border: 1.5px solid #6e6d6d;
    border-radius: 7px;
  }
  .label{
    display: block;
    width: 100px;
    font-size: 18px;
    margin: 15px;
  }
  .input{
    width: 60%;
    height: 27px;
    text-align: center;
    margin-top: 10px;
    margin-left: 25px;
  }
  .input{
    margin-left: 10px;
  }
  .atherSetting{
    margin-left: 60px;
  }
  .span-symbol-good,.span-symbol-bad{
    width: 20px;
    height: 20px;
    margin: 10px;
    margin-top:15px;
    text-align: center;
    //padding-top: 5px;
    border: 2px solid #4b4b4b;
    border-radius: 50%;
  }
  .span-symbol-good{
    background-color: #9edc86;
  }
  .span-symbol-bad{
    background-color: #e71f1f;
    border: 2px solid #6e6d6d;
  }

</style>