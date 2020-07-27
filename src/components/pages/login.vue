<template>
  <div class="main">
    <el-form :model="user" :rules="rules" ref="ruleForm" label-width="80px" class="login">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" clearable show-password></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" class="btn" @click="login('ruleForm')">登录</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUserLogin } from "../../uitl/axios";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserLogin(this.user).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              //登录信息存储到本地
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.main {
  width: 100wm;
  height: 100vh;
  background: url('../../assets/img/2.jpg') no-repeat;
  background-size: cover;

  .login {
    background: $bgcolortwo;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    padding: 50px 90px 50px 30px;
    box-sizing: border-box;
    border-radius: 20px;
    text-align: center;
  }
}

.btn {
  width: 200px;
  margin-top: 35px;
  margin-left: 60px;
  font-size: 16px;
}

.el-input {
  width: 350px;
}
</style>
