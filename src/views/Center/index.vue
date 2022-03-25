<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><em style="font-size:17px;font-weight:bolder">个人信息</em></span>
      <el-button style="float: right; padding: 3px 60px" type="text" :disabled="isnan" @click="handleEdit">
        {{ flag? '编辑个人信息' : '确定' }}
      </el-button>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        :disabled="!isnan"
        @click="dialogFormVisible = true"
      >
        添加个人信息
      </el-button>

    </div>
    <div v-for="(v, k, i) in userInfo" :key="k" class="text item">

      <div class="key" style="margin-left: 50px;display: inline-block;width:100px">
        <span><strong>{{ k | transformToChinese }}</strong></span>:
      </div>

      <template v-if="flag">
        <span style="margin-left: 50px">{{ ['createTime', 'updateTime'].indexOf(k) !== -1 ? formatDay(v) : v }}</span>
      </template>
      <template v-else>
        <input
          v-if="['createTime', 'userId', 'updateTime', 'id', 'gradeId'].indexOf(k) === -1"
          v-model="formData[`inp${i}`] = v"
          type="text"
        >
        <span v-else style="margin-left: 50px">{{ ['createTime', 'updateTime'].indexOf(k) !== -1 ? formatDay(v) : v }}</span>
      </template>

      <el-divider />

    </div>
    <!-- 学生对话框 -->
    <el-dialog v-if="type === '2'" title="添加用户信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="名字" label-width="100px">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" label-width="100px">
          <el-input v-model="form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学号" label-width="100px">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级" label-width="100px">
          <el-select v-model="form.gradeId" placeholder="请选择班级">
            <el-option
              v-for="item in grade"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 老师对话框 -->
    <el-dialog v-if="type === '1'" title="添加用户信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form1">
        <el-form-item label="名字" label-width="100px">
          <el-input v-model="form1.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" label-width="100px">
          <el-input v-model.number="form1.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属院系" label-width="100px">
          <el-input v-model="form1.department" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工号" label-width="100px">
          <el-input v-model="form1.jobNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-select v-model="form1.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  name: 'Center',
  data() {
    return {
      userInfo: {},
      formData: {
        inp1: '',
        inp3: '',
        inp4: '',
        inp5: '',
        inp6: ''

      },
      flag: true,
      grade: [],
      dialogFormVisible: false,
      form: {
        name: '',
        gradeId: '',
        age: '',
        phone: '',
        number: '',
        userId: ''

      },
      form1: {
        name: '',
        department: '',
        age: '',
        jobNumber: '',
        sex: '',
        userId: ''

      }
    }
  },
  watch: {
    grade() {
      const gradeItem = this.grade.find(item => item.id === this.userInfo.gradeId)

      if (this.userInfo.gradeId) {
        this.userInfo.gradeId = gradeItem.name
      }
    }
  },
  computed: {
    ...mapState({
      userid: state => state.user.userid,
      type: state => state.user.type
    }),
    isnan() {
      return isNaN(this.userInfo.id)
    }
  },
  mounted() {
    this.initPerInfo().then(() => {
      this.getGradePull()
    }).catch(() => {})
  },
  methods: {
    // getPerStuInfo
    async initPerInfo() {
      if (this.type === '2') {
        const result = await this.$API.student.getPerStuInfo(this.userid)
        this.userInfo = result
      } else {
        const result = await this.$API.teacher.getTeacherInfo(this.userid)
        this.userInfo = result
      }
    },
    async handleEdit() {
      this.flag = !this.flag
      if (this.flag) {
        if (this.type === '2') {
          await this.$API.student.editStudentInfo(this.userInfo.id, {
            age: this.formData.inp5,
            name: this.formData.inp4,
            number: this.formData.inp3,
            phone: this.formData.inp6,
            userId: this.userInfo.userId

          })
        } else {
          await this.$API.teacher.editTeacherInfo(this.userInfo.id, {
            age: parseInt(this.formData.inp4),
            department: this.formData.inp6,
            jobNumber: this.formData.inp3,
            name: this.formData.inp1,
            sex: this.formData.inp5,
            userId: this.userid
          })
        }

        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.initPerInfo()
      }
    },
    formatDay(val) {
      var formatday
      if (val) {
        formatday = dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        formatday = ''
      }
      return formatday
    },
    async getGradePull() {
      const result = await this.$API.grade.getGradePull()
      // console.log(result)
      this.grade = result
    },
    async addConfirm() {
      if (this.type === '2') {
        this.form.userId = parseInt(this.userid)
        await this.$API.student.addPerInfo(this.form)
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.form1.userId = parseInt(this.userid)
        await this.$API.teacher.addTeacherInfo(this.form1)
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      }

      this.dialogFormVisible = false
      this.initPerInfo()
    }

  }

}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
