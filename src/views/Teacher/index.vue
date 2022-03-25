<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <ItemSearch />
    </div>
    <TableList :tdata="tableData" :total="total" />
  </el-card>
</template>

<script>
export default {
  name: 'Teacher',
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10,
        jobNumber: '',
        name: ''
      },
      total: 0,
      tableData: []
    }
  },
  mounted() {
    this.initTeacherAll()
  },
  methods: {
    async initTeacherAll() {
      try {
        const result = await this.$API.teacher.getTeacherAll(this.params)
        // console.log(result)
        this.total = result.total
        this.tableData = result.records
      } catch (e) {
        Promise.reject(new Error('faile'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
