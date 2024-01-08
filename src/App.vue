<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
}
</script>
<style>
  #app{
    display: block;
    width: 100%;
    height: 100%;
  }
  body{
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
