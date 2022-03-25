<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>体侧成绩</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">添加成绩</el-button>
    </div>
    <TableList :tdata="tableData" :total="total" />
    <!-- ------------ -->
    <el-dialog title="添加成绩" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="引体向上" label-width="100px">
          <el-input v-model="form.chinning" autocomplete="off" />
        </el-form-item>
        <el-form-item label="八百米成绩" label-width="100px">
          <el-input v-model="form.eightHundred" autocomplete="off" />
        </el-form-item>
        <el-form-item label="四百米成绩" label-width="100px">
          <el-input v-model="form.fourHundred" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身高" label-width="100px">
          <el-input v-model="form.height" autocomplete="off" />
        </el-form-item>
        <el-form-item label="跳远" label-width="100px">
          <el-input v-model="form.jump" autocomplete="off" />
        </el-form-item>
        <el-form-item label="百米成绩" label-width="100px">
          <el-input v-model="form.oneHundred" autocomplete="off" />
        </el-form-item>
        <el-form-item label="肺活量" label-width="100px">
          <el-input v-model="form.pulmonary" autocomplete="off" />
        </el-form-item>
        <el-form-item label="座位体前屈" label-width="100px">
          <el-input v-model="form.sitAndReach" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仰卧起坐" label-width="100px">
          <el-input v-model="form.sitUp" autocomplete="off" />
        </el-form-item>
        <el-form-item label="体重" label-width="100px">
          <el-input v-model="form.weight" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudentData">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
  <!-- 对话框 -->

</template>

<script>
export default {
  name: 'Data',
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10,
        userId: sessionStorage.getItem('USERID')
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form: {
        chinning: '',
        eightHundred: '',
        fourHundred: '',
        height: '',
        jump: '',
        oneHundred: '',
        pulmonary: '',
        sitAndReach: '',
        sitUp: '',
        userId: sessionStorage.getItem('USERID'),
        weight: ''
      }
    }
  },
  mounted() {
    this.initStudentData()
  },
  methods: {
    async initStudentData() {
      const result = await this.$API.teacher.getStudentData(this.params)
      console.log(result)
      this.tableData = result.records
      this.total = result.total
    },
    async addStudentData() {
      try {
        await this.$API.teacher.addStudentData(this.form)
        this.initStudentData().then(() => {
          this.$message({
            message: '添加成绩成功',
            type: 'success'
          })
        })
      } catch (error) {

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
