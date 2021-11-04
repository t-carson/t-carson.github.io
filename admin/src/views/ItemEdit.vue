<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <!-- 表单开始 -->
    <!-- natice表示的是原生的表单,prevent是阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 添加 -->
      <!-- 商品名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- 商品图标 -->
      <el-form-item label="图标">
        <!-- $http的默认参数里面有个baseURL -->
        <!-- 就相当于http://localhost:3000/admin/api/upload -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  // 接收id
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    // 上传图片
    afterUpload(res) {
      // 第一个参数是你要赋的主体,第二个是你要赋值的属性是什么,第三个是res.url本身
      this.$set(this.model, "icon", res.url);
      //上面这个是vue提供的一个比较方面的语法
      // this.model.icon = res.url
    },
    async save() {
      let res;
      let permissions = false;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
        permissions = true;
      } else {
        if (this.model.icon && this.model.name) {
          res = await this.$http.post("rest/items", this.model);
          permissions = true;
        } else {
          this.$message.error("请填写名称和图标");
        }
      }
      if (permissions) {
        this.$router.push("/items/list");
        this.$message({
          type: "success",
          message: "保存成功",
        });
      }
    },
    // 有ID的话就会执行这个
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>
