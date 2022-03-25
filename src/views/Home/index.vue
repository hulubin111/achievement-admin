<template>
  <div class="home-container">
    <div class="info">
      <h3><em>Welcome !</em></h3>
      <p>
        <em>用户类型：{{ $store.state.user.type | formatType }}</em>
      </p>
      <p>
        <em>用户名：{{ $store.state.user.username }}</em>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {

  }
}
</script>

<style lang="scss" scoped>
.home-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/111.jpg') no-repeat;
  background-size: cover;
}
.info {
  position: absolute;
  top: 100px;
  left: 300px;
}
</style>
