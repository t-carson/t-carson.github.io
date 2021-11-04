<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <!-- 表单开始 -->
    <!-- natice表示的是原生的表单,prevent是阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 添加 -->
      <!-- 英雄名称 -->
      <!-- type="border-card" -->
      <el-tabs>
        <!-- 基础信息开始 -->
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- $http的默认参数里面有个baseURL -->
            <!-- 就相当于http://localhost:3000/admin/api/upload -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="定位">
            <!-- 后台已经写好的可以定义多个定位的数据这里我们可以 multiple 定义多个定位 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <!-- 这里如果涉及多层级的方式的话我们就得在 model 里面定义出来 -->
            <el-rate
              style="margin-top:0.7rem"
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <!-- 这里如果涉及多层级的方式的话我们就得在 model 里面定义出来 -->
            <el-rate
              style="margin-top:0.7rem"
              :max="10"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <!-- 这里如果涉及多层级的方式的话我们就得在 model 里面定义出来 -->
            <el-rate
              style="margin-top:0.7rem"
              :max="10"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <!-- 这里如果涉及多层级的方式的话我们就得在 model 里面定义出来 -->
            <el-rate
              style="margin-top:0.7rem"
              :max="10"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 基础信息结束 -->
        <!-- 技能介绍开始 -->
        <el-tab-pane label="技能介绍">
          <el-button size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i> 添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap">
            <!-- 这种写法是取得是item的索引值 -->
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <!-- 把res.url接收的参数赋值给item.icon -->
                <!-- res => $set(item,'icon', res.url) 用vue里面的显式赋值 给item这个元素主体里面的icon属性赋值 -->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- solice这个方式是类似与切片 -->
                <el-button
                  type="danger"
                  size="small"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 技能介绍结束 -->
      </el-tabs>
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
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        skills: [],
        scores: {
          difficult: 0,
        },
      },
    };
  },
  methods: {
    // 上传图片
    afterUpload(res) {
      // 第一个参数是你要赋的值,第二个是你要给他赋值的属性是什么,第三个是res.url本身
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url;
      // this.model.name = res.
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 有ID的话就会执行这个
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      // 这种赋值方式第一个参数是对象属性的合并,第二个参数是现有的数据第三个就是服务端获取过来的数据
      // res.data → (this.model → {})
      // Object.assign方法用于对象的合并-深拷贝
      // 如果目标对象与源对象有同名属性，或多个源对象有同名属性,则后面的属性会覆盖前面的属性。
      this.model = Object.assign({}, this.model, res.data);
    },
    // 去服务器端请求角色的定位数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 去服务器端请求装备的数据
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
  },
  // vue实例被生成后调用这个函数
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>
