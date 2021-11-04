<template>
  <div class="about">
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <!-- 意思就是删除所选行 -->
          <el-button type="danger" plain @click="remove(scope.row)"
            >删除</el-button
          >
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
    // 用于 从服务器获取最新的数据
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除【${row.name}】`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 当删除执行完之后要再获取一下数据
        this.fetch();
        // 这里如果不加就会因为取消操作时，无法捕获而报错
      });
    },
  },
  // 项目渲染完毕之后执行的钩子函数
  created() {
    this.fetch();
  },
};
</script>
