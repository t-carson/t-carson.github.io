<template>
  <div class="about">
    <h1>英雄列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="title" label="称号"></el-table-column>
        <!-- <el-table-column prop="categories" label="定位"></el-table-column> -->
        <el-table-column prop="avatar" label="头像">
           <template slot-scope="scope">
             <img :src="scope.row.avatar" style="height:3rem">
           </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- 点击编辑上方地址栏也随随之传入ID值 -->
            <el-button type="primary" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            <!-- 意思就是删除所选行 -->
            <el-button type="danger" plain @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除【${row.name}】`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 当删除执行完之后要再获取一下数据
          this.fetch();
          // 这里如果不加就会因为取消操作时，无法捕获而报错
        })
    },
  },
  created() {
    this.fetch();
  },
};
</script>
