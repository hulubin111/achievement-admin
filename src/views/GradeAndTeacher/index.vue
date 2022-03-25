<template>
  <div class="gradeandteacher">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <ItemSearch
          :options1="gradePull"
          :options2="teacherPull"
          :isdisabled="true"
          @selected1="selected1"
          @selected2="selected2"
        />
      </div>
      <TableList :total="total" :tdata="tableData" :handleshow="true" @currentchange="currentchange">
        <template #handle="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.iteminfo.$index, scope.iteminfo.row)"
          >删除</el-button>
        </template>
      </TableList>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GradeAndTeacher',
  data() {
    return {
      gradePull: [],
      teacherPull: [],
      // 查看参数，搜索参数
      params: {
        currentPage: 1,
        pageSize: 10,
        gradeId: '',
        teacherId: ''
      },
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.initGradePull()
    this.initTeacherPull()
    this.initTeacherAndGrade()
  },
  methods: {
    async initGradePull() {
      const result = await this.$API.grade.getGradePull()
      this.gradePull = result
    },
    async initTeacherPull() {
      const result = await this.$API.teacher.teacherPull()
      // console.log(result)
      this.teacherPull = result
    },
    async initTeacherAndGrade(params = this.params) {
      const result = await this.$API.teacher.getTeacherAndGrade(params)
      // console.log(result)
      this.tableData = result.records
      this.total = result.total
    },
    currentchange(p) {
      this.params.currentPage = p
      this.initTeacherAndGrade()
    },
    selected1(v) {
      this.params.gradeId = v
      this.initTeacherAndGrade()
    },
    selected2(v) {
      this.params.teacherId = v
      this.initTeacherAndGrade()
    },
    async handleDelete(i, r) {
      await this.$API.teacher.deleteTeacherAndGrade(r.id)
      if (this.tableData.length === 1 && this.params.currentPage !== 1) {
        this.params.currentPage--
      }
      this.$notify({
        title: '成功',
        message: 'good!',
        type: 'success'
      })
      this.initTeacherAndGrade()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
