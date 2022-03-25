<template>
  <div class="grade-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <ItemSearch item1="班级名" @clickSearch="clickSearch" />
        <el-button
          type="success"
          icon="el-icon-check"
          style="position:absolute;right:650px;top:70px"
          @click="addGrade"
        >
          添加班级
        </el-button>
      </div>
      <TableList :tdata="allGrade" :total="total" :handleshow="true" @currentchange="currentchange">
        <template #handle="scope">

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.iteminfo.$index, scope.iteminfo.row)"
          >删除</el-button>
          <!--  -->

          <el-button type="primary" size="mini" @click="giveTeacher(scope.iteminfo.row)">班级安排老师</el-button>
        </template>
      </TableList>
    </el-card>
    <!--  -->
    <el-dialog
      title="给该班级安排老师"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-select v-model="value" placeholder="班级安排老师" class="selectBox">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />

      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Grade',
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10,
        name: ''
      },
      // 班级数据
      allGrade: [],
      total: 0,
      value: '',
      options: [],
      dialogVisible: false,
      gradeId: ''

    }
  },
  mounted() {
    this.initGrade()
    this.initTeacherPull()
  },
  methods: {
    async initGrade(params = this.params) {
      const result = await this.$API.grade.getAllGrade(params)
      // console.log(result)
      this.allGrade = result.records
      this.total = result.total
    },
    clickSearch(e) {
      let params = {}
      params = { ...this.params }
      params.name = e.keyword
      this.initGrade(params)
    },
    addGrade() {
      this.$prompt('请输入班级名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        await this.$API.grade.addGrade({ name: value })
        this.$message({
          type: 'success',
          message: '你添加的班级名是: ' + value
        })
        this.initGrade()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    currentchange(p) {
      this.params.currentPage = p
      this.initGrade()
    },
    async handleDelete(i, row) {
      try {
        await this.$API.grade.deleteGrade(row.id)
        if (this.allGrade.length === 1 && this.params.currentPage !== 1) {
          this.params.currentPage--
        }

        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initGrade()
      } catch (error) {
        this.$message.error(error)
      }
    },
    async initTeacherPull() {
      const result = await this.$API.teacher.teacherPull()
      this.options = result
    },
    giveTeacher(row) {
      this.dialogVisible = true
      this.gradeId = row.id
    },
    async confirm() {
      await this.$API.grade.addTeacherToGrade({
        gradeId: this.gradeId,
        teacherId: this.value
      })
      this.$notify({
        title: '成功',
        message: '安排成功啦',
        type: 'success'
      })
      this.dialogVisible = false
      this.value = ''
    }
  }

}
</script>

<style lang="scss" scoped>
// .selectBox{
//   width: 120px;
//   margin-left: 10px;
// }
</style>
