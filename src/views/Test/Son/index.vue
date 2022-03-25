<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'Son',
  mounted() {
    console.log(this.$attrs, '自定义属性')
    // console.log(this.$listeners, '自定义事件')
  }

}
</script>

<style>

</style>
