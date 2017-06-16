<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <hello></hello> -->
    <my-table></my-table>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Table from './components/Table'

export default {
  name: 'app',
  components: {
    // Hello
    'my-table': Table
  }
}
</script>

<style>
#app2 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
