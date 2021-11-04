<template>
  <div class="log-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // localStorage就是浏览器缓存,下次打开有缓存
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('info', JSON.stringify(this.model));
      // sessionStorage就是浏览器不缓存,下次打开无缓存
      // sessionStorage.token = res.data.token;
      this.$router.push("/");
      // console.log(res.data);
      this.$message({
        type: "success",
        message: `欢迎进入后台管理程序!`,
      });
    },
  },
};
</script>

<style>
.log-container {
  width: 25rem;
  margin: 10rem auto;
}
</style>
