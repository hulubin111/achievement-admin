<template>
  <div class="login-container">
    <!-- el-form组件：elementUI插件里面的一个组件，经常展示表单元素  model：用于收集表单数据  rules：表单验证规则-->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="user">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.user"
          placeholder="Username"
          name="user"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item label="用户类型" prop="type" class="user-type">
        <el-radio-group v-model="loginForm.type">
          <el-radio label="0">管理员</el-radio>
          <el-radio label="1">教师</el-radio>
          <el-radio label="2">学生</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <div class="tips">
        <span>超级管理员</span>
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 123</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    // 自定义检验规则
    var validateType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择用户'))
      }
      callback()
    }
    return {
      loginForm: {
        user: '',
        password: '',
        type: ''
      },
      loginRules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: [
          { validator: validateType, trigger: 'change' }
        ]
      },
      passwordType: 'password',
      loading: false,
      flag: 0

    }
  },
  watch: {

  },
  methods: {
    handleLogin() {
      this.$refs['loginForm'].validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            await this.$store.dispatch('login', this.loginForm)
            this.$router.push({ name: 'Home' })
            this.$message({
              message: '登录成功',
              type: 'success'
            })
          } catch (error) {
            this.$message.error('登录失败')
          }
          this.loading = false
        }
      })
    },
    showPwd() {
      this.flag++
      if (this.flag % 2 === 0) {
        this.passwordType = 'password'
      } else {
        this.passwordType = 'text'
      }
    }
  }
}
</script>

<style lang="scss">

// $bg:white;
$bg:rgb(200, 200, 169);

$light_gray:rgb(12, 165, 200);
// $light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(231, 224, 206);
    border-radius: 5px;
    // color: red;
    color: skyblue;
  }
}
</style>

<style lang="scss" scoped>

// $bg:white;
$dark_gray:white;
$light_gray:white;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background:url('~@/assets/bgimg.jpg');
  background-size: 100% 100%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.user-type{
  border: none;
  background: none;
}
::v-deep .is-checked {
  .el-radio__label{
    color: pink;
  }
  .el-radio__inner {
    border-color: pink;
    background: pink;
  }

}
</style>

