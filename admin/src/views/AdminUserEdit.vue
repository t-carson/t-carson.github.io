<template>
  <div class="about">
    <!-- 如果有ID传过来我们就显示编辑,反之新建 -->
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <!-- 表单开始 -->
    <!-- natice表示的是原生的表单,prevent是阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 添加 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单结束 -->
  </div>
</template>

<script>
export default {
  // 接收主路由分类的子路由传过来的id
  props: {
    id: {},
  },
  data() {
    return {
      //用于存储临时数据
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 更改操作需要传入ID用put方法
        res = await this.$http.put(`rest/admin_user/${this.id}`, this.model);
      } else {
        // 否则新增用post方法
        res = await this.$http.post("rest/admin_user", this.model);
      }
      // 这里意思是提交完之后就会跳转至另一个地址
      this.$router.push("/admin_user/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 用于点击编辑之后实时刷新编辑页面原有的值
    async fetch() {
      const res = await this.$http.get(`rest/admin_user/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    // 如果有ID才执行
    this.id && this.fetch();
  },
};
</script>
