<template>
  <div id="app">
    <div id="main-container" class="container">
      <div id="header">
          <div class="userInfo" v-if="this.$store.state.user">
            {{this.$store.state.user.name}}, {{this.$store.state.user.companyName}}
          </div>
      </div>
      <Nav v-if="this.$store.state.user"/>
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
  },
  data(){
    return{

    }
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
    .logo{
      padding: 1em;
      font-size: 28px;
      text-decoration: none;
    }
    color: #124273;
    flex: 1 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    background-color: rgba(255, 255, 255, .9);
    padding: 0.5em;
    float: left;
}

.container{
    display: flex;
    flex-flow: row wrap;
}
#main-container{
    background-color: rgba(28, 91, 164, .5);
}
.userInfo{
  margin: auto 0 auto auto;
  display: inline-block;
}
.logo{
  display: inline-block;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
</style>