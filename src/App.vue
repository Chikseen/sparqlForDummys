<template>
  <h1>SPARQL For Dummys</h1>
  <h4>A simple sparql query generator</h4>
  <h4>simply drag and drop the components in place, write the params and get your sparql query</h4>
 <!--  <nav>
    <router-link to="/">Home</router-link> |
  </nav> -->
  <router-view />
</template>

<script>
import coms from "@/components";

export default {
  mounted() {
    this.$store.commit("setComponents", coms);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
