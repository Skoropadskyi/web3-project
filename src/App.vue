<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<script>
import AppHeader from "@/components/shared/AppHeader";
import AppFooter from "@/components/shared/AppFooter";
export default {
  components: { AppFooter, AppHeader },
};
</script>

<style>
body {
  position: relative;
  min-height: 100vh;
  background-color: #f8fafc;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
