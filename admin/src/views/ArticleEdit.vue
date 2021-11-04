<template>
  <div class="about">
    <!-- 如果有ID传过来我们就显示编辑,反之新建 -->
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <!-- 表单开始 -->
    <!-- natice表示的是原生的表单,prevent是阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 上级分类 -->
      <el-form-item label="分类分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 添加 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单结束 -->
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  // 接收主路由分类的子路由传过来的id
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      //用于存储临时数据
      model: {},
      categories: [],
    };
  },
  methods: {
    // 图片文件上传器
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        // 更改操作需要传入ID用put方法
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 否则新增用post方法
        res = await this.$http.post("rest/articles", this.model);
      }
      // 这里意思是提交完之后就会跳转至另一个地址
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 用于点击编辑之后实时刷新编辑页面原有的值
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 先获取之前新建分类页面新建的上级分类,然后将返回回来的数据保存在一个数组里面,之后循环里面的数据显示到编辑页面用于创建更多的子集分类
    async fetchCatgories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCatgories();
    // 如果有ID才执行
    this.id && this.fetch();
  },
};
</script>
