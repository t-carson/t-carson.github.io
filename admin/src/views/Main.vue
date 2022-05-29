<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 这里加了router之后就变成了路由的一个状态点哪里 -->
        <el-menu router unique-opened :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>内容管理
            </template>
            <!-- 物品开始 -->
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <!-- 物品结束 -->
            <!-- 英雄开始 -->
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <!-- 英雄结束 -->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>运营管理
            </template>
            <!-- 文章管理开始 -->
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章编辑</el-menu-item>
            </el-menu-item-group>
            <!-- 文章管理结束 -->
            <!-- 广告位开始 -->
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
            <!-- 广告位结束 -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>系统设置
            </template>
            <!-- 分类开始 -->
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <!-- 分类结束 -->
            <!-- 管理员开始 -->
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
            </el-menu-item-group>
            <!-- 管理员结束 -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px; border-bottom: 2px dashed rgb(230,230,230)">
          <el-dropdown size="mini" split-button type="primary">
            {{info}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item> <span @click="logout">安全退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 子路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const item = {};
    return {
      info: null,
      tableData: Array(20).fill(item),
    };
  },
  created() {
    const info = JSON.parse(localStorage.getItem('info'));
    this.info = info.username;
  },
  methods: {
    logout() {
      // 点击按钮清空 localStorage 里的 token值 然后跳转至登陆页面
      window.localStorage.clear();
      this.$router.push("/login");
      this.$message.success("退出成功!");
    },
  },
};
</script>

<style>
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: rgb(255, 255, 255);
}
.top {
  margin-top: 10px;
}
</style>
