<template>
  <div class="student-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <ItemSearch
          item1="姓名"
          item2="年龄"
          item3="学号"
          :options1="grade"
          @clickSearch="handleSearch"
          @selected1="selected1"
        />
      </div>

      <TableList :tdata="tableData" :total="total" @currentchange="currentchange" />
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      // 条件查询学生信息
      studentParams: {
        currentPage: 1,
        pageSize: 10,
        age: '',
        gradeId: '',
        name: '',
        number: ''
      },
      // 班级下拉框数据
      grade: [],
      // 获取到的表格数据
      tableData: [],
      // 总条数
      total: 0
    }
  },
  watch: {
    tableData(newV, oldV) {
      this.$nextTick(() => {
        this.tableData.forEach(item1 => {
          if (item1.gradeId) {
            const result = this.grade.find(item => item.id === item1.gradeId)

            if (result) {
              item1.gradeId = result.name
            }
          }
        })
      })
    }
  },
  mounted() {
    this.getGradePull().then(() => {
      this.initStudentInfo()
    })
  },
  methods: {
    handleSearch(obj) {
      const { keyword, radio } = obj
      switch (radio) {
        case '姓名':
          this.studentParams.name = keyword
          break
        case '年龄':
          this.studentParams.age = keyword
          break
        case '学号':
          this.studentParams.number = keyword
          break
      }
      this.initStudentInfo().then(() => {
        const o = { age: '',
          gradeId: '',
          name: '',
          number: '' }
        Object.assign(this.studentParams, o)
      })
    },
    selected1(v) {
      this.studentParams.gradeId = v
    },
    // 获取班级下拉框
    async getGradePull() {
      const result = await this.$API.grade.getGradePull()
      // console.log(result)
      this.grade = result
    },
    // 获取学生信息
    async initStudentInfo() {
      const result = await this.$API.student.getStudentInfo(this.studentParams)
      // console.log(result)
      this.tableData = result.records
      this.total = result.total
    },
    currentchange(p) {
      this.studentParams.currentPage = p
      this.initStudentInfo()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
