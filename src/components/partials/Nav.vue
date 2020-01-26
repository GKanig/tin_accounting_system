<template>
<div id="menu">
            <div class="vertical-menu">
              <nav> 
                <router-link to="/invoices">Faktury</router-link>
                <router-link to="/products">Produkty</router-link>
                <router-link to="/contractor">Kontrachenci</router-link>
              </nav>
            </div>
            <router-link v-on:click="this.$store.state.user = none" class="logout-button" to="/">Wyloguj</router-link>
        </div>
</template>
<script>
export default {
    name: 'Nav'
}
</script>
<style lang="scss" scoped>

.logout-button {
    width: 60%;
    border: solid 1px black;
    margin: auto auto 15px auto;
    font-size: 20px;
    padding: 12px;
    text-decoration: none;
}

#menu{
  background-color: rgba(255, 255, 255, .9);
  flex: 1 0;
  height: calc(100vh - 50px);
  display: flex;
  color: #454546;
  text-align: center;
  flex-direction: column;
}

#main-box{
    background-color: white;
    flex: 5 0;
    margin: 15px;
    height: calc(100vh - 80px);
    display: flex;
    color: black;
    text-align: left;
    flex-direction: column;
}

.vertical-menu {
    width: 100%;
    text-align: center;
}

.vertical-menu a {
    background-color: #eee;
    color: #454546;
    display: block; 
    font-style: bold;
    font-size: 20px;
    padding: 12px;
    text-decoration: none;
}

.vertical-menu a:hover {
    background-color: #ccc;
}

.vertical-menu a.active {
    background-color: #124273;
    color: white;
}
</style>