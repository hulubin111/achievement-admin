<template>
  <div class="user-container">
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <el-input
          v-model.trim="params.user"
          class="sinp"
          placeholder="请输入内容/搜索空则是全部"
          clearable
        />
        <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
        <el-button type="success" size="medium" @click="addSwitch(-1)">添加用户</el-button>
      </div>
      <div class="text item">
        <el-table
          v-loading="tableloading"
          size="size"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="createTime"
            label="创建日期"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | formatDay }}
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新日期"
          >
            <template slot-scope="scope">
              {{ scope.row.updateTime | formatDay }}
            </template>
          </el-table-column>
          <el-table-column
            prop="user"
            label="用户名"
          />
          <el-table-column
            prop="password"
            label="密码"
          />
          <el-table-column
            prop="type"
            label="用户类型"
          >
            <template slot-scope="scope">
              {{ scope.row.type | formatType }}
            </template>
          </el-table-column>
          <el-table-column

            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :loading="deleteLoading === scope.$index"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="currentchange"
      />
    </el-card>
    <!-- 对话框 -->
    <el-dialog :title="`${addoredit === -1 ? '添加' : '编辑'}用户`" :visible.sync="dialogFormVisible" append-to-body width="40%">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.user" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="用户类型" label-width="80px">
          <el-select v-model="form.type" placeholder="请选择用户类型">
            <el-option label="管理员" value="0" />
            <el-option label="教师" value="1" />
            <el-option label="学生" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// el-dialog__body
export default {
  name: 'User',
  data() {
    return {
      total: 0,
      params: {
        user: '',
        currentPage: 1,
        pageSize: 9
      },
      tableData: [],
      tableloading: false,
      dialogFormVisible: false,
      form: {
        user: '',
        type: '',
        password: ''

      },
      deleteLoading: -1,
      addoredit: 0
    }
  },
  mounted() {
    this.initUser()
  },
  methods: {
    // 初始化
    async initUser() {
      this.tableloading = true
      const result = await this.$API.user.searchUser(this.params)
      // console.log(result)
      this.tableData = result.records
      this.total = result.total
      this.params.user = ''
      this.tableloading = false
    },
    // 搜索
    search() {
      this.initUser()
    },
    // 添加或编辑用户
    async confirm() {
      let flag = true
      for (const k in this.form) {
        if (!this.form[k]) {
          flag = false
        }
      }
      if (flag) {
        if (this.addoredit === -1) {
          await this.$API.user.addUser(this.form)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          // 编辑用户
          await this.$API.user.editUser(this.addoredit, this.form)
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }

        this.initUser()
        this.dialogFormVisible = false
        this.form = {
          user: '',
          type: '',
          password: ''

        }
      } else {
        this.$message({
          message: '不能有空',
          type: 'warning'
        })
      }
    },
    addSwitch(v) {
      this.dialogFormVisible = true
      this.addoredit = v
    },
    currentchange(p) {
      this.params.user = ''
      this.params.currentPage = p
      this.initUser()
    },
    handleEdit(i, row) {
      this.addoredit = row.id
      this.dialogFormVisible = true
      this.form = {
        user: row.user,
        type: row.type,
        password: row.password

      }
    },
    async handleDelete(i, row) {
      try {
        this.deleteLoading = i
        await this.$API.user.deleteUser(row.id)
        if (this.tableData.length === 1) {
          this.params.currentPage--
        }
        this.initUser()
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        })
      }
      this.deleteLoading = -1
    }
  }
}
</script>

<style lang="scss" scoped>
.sinp  {
  width: 30%;
}
</style>
