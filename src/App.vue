<template>
  <div id="app">
    <div id="main-container" class="container">
      <div id="header">
          Moja Firma
      </div>
      <Nav />
      <router-view/>
    </div>
  </div>
</template>
<script>
import Nav from './components/partials/Nav.vue';
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>
<style lang="scss">
body{
    margin:0px;
}

#header{
    height: calc(50px - 1);
    max-height: calc(50px - 1);
    font-size: 25px;
    color: #124273;
    flex: 1 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    background-color: rgba(255, 255, 255, .9);
    padding: 0.5em;
}

.container{
    display: flex;
    flex-flow: row wrap;
}
#main-container{
    background-color: rgba(28, 91, 164, .5);;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
</style>