<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <ItemSearch item1="工号" item2="名字" @clickSearch="clickSearch" />
    </div>
    <TableList
      v-loading="tloading"
      :tdata="tableData"
      :total="total"
      border
      :handleshow="true"
      @currentchange="currentchange"
    >
      <template #handle="scope">

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.iteminfo.$index, scope.iteminfo.row)"
        >删除</el-button>
      </template>
    </TableList>
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
        jobNumber: undefined,
        name: undefined
      },
      total: 0,
      tableData: [],
      tloading: false
    }
  },
  mounted() {
    this.initTeacherAll()
  },
  methods: {
    async initTeacherAll(params = this.params) {
      try {
        this.tloading = true
        const result = await this.$API.teacher.getTeacherAll(params)
        this.total = result.total
        this.tableData = result.records
        this.tloading = false
      } catch (e) {
        Promise.reject(new Error('faile'))
      }
    },
    currentchange(p) {
      this.params.currentPage = p
      this.initTeacherAll()
    },
    async handleDelete(i, r) {
      await this.$API.teacher.deleteUserInfo(r.id)
      if (this.tableData.length === 1 && this.params.currentPage > 1) {
        this.params.currentPage--
      }
      this.initTeacherAll()
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    clickSearch({ keyword, radio }) {
      const params = { ...this.params }
      if (radio === '工号') {
        params.jobNumber = keyword
      } else {
        params.name = keyword
      }
      this.initTeacherAll(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
