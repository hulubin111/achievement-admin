<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // console.log(this.$router.options.routes, 'app')
    // this.$store.dispatch('resultRoutes')
  }
}
</script>
