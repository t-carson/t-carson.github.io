<template>
  <div class="about">
    <!-- 如果有ID传过来我们就显示编辑,反之新建 -->
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <!-- 表单开始 -->
    <!-- natice表示的是原生的表单,prevent是阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 添加 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button :disabled="model.items.length > 4" size="small" @click="model.items.push({})"
          ><i class="el-icon-plus"></i> 添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap:wrap">
          <!-- 这种写法是取得是item的索引值 -->
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem">
              <!-- 把res.url接收的参数赋值给item.icon -->
              <!-- res => $set(item,'icon', res.url) 用vue里面的显式赋值 给item这个元素主体里面的icon属性赋值 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeader()"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <!-- splice这个方式是类似与切片 -->
              <el-button
                type="danger"
                size="small"
                @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: [],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 更改操作需要传入ID用put方法
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 否则新增用post方法
        res = await this.$http.post("rest/ads", this.model);
      }
      // 这里意思是提交完之后就会跳转至另一个地址
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 用于点击编辑之后实时刷新编辑页面原有的值
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
  },
  created() {
    // 如果有ID才执行
    if (this.id) {
      this.fetch()
    }
  },
};
</script>
