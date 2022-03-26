<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>体侧成绩</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">添加成绩</el-button> -->
    </div>
    <TableList v-loading="tableLoading" :handleshow="true" :tdata="tableData" :total="total" border @currentchange="currentchange">
      <template #handle="scope">
        <el-button
          size="mini"
          type="primary"
          :disabled="isdisable(scope.iteminfo.row)"
          @click="handleAdd(scope.iteminfo.$index, scope.iteminfo.row)"
        >添加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          @onConfirm="deleteCon(scope.iteminfo.$index, scope.iteminfo.row)"
        >
          <el-button
            slot="reference"
            size="mini"
            type="danger"
            class="mybtn"
            :disabled="!isdisable(scope.iteminfo.row)"
          >删除</el-button>
        </el-popconfirm>

      </template>
    </TableList>
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
        userId: parseInt(sessionStorage.getItem('USERID'))
      },
      tableData: [],
      total: 0,
      tableLoading: false,
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
        userId: '',
        weight: ''
      }
    }
  },
  mounted() {
    this.initStudentData()
  },
  methods: {
    isdisable(row) {
      const blackList = ['id', 'userId', 'updateTime', 'createTime', 'name']
      const arr = Object.keys(row)
      const flag = arr.some(item => {
        if (blackList.indexOf(item) === -1 && row[item]) {
          return true
        }
      })
      return flag
    },
    async initStudentData() {
      this.tableLoading = true
      const result = await this.$API.teacher.getStudentData(this.params)
      // console.log(result)
      this.tableData = result.records
      this.total = result.total
      this.tableLoading = false
    },
    async addStudentData() {
      try {
        await this.$API.teacher.addStudentData(this.form)
        this.initStudentData().then(() => {
          this.$message({
            message: '添加成绩成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          return 'ok'
        })
      } catch (error) {
        return Promise.reject(new Error('faile'))
      }
    },
    handleAdd(i, row) {
      this.dialogFormVisible = true
      this.form.userId = row.userId
    },
    async deleteCon(i, row) {
      // console.log(row)
      await this.$API.teacher.deleteData(row.id)
      if (this.tableData.length === 1 && this.params.currentPage > 1) {
        this.params.currentPage--
      }
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.initStudentData()
    },
    currentchange(p) {
      this.params.currentPage = p
      this.initStudentData()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
.mybtn {
  margin-left: 0;
}
</style>
