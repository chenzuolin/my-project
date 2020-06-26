<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/department">部门管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/userlist">用户管理</router-link>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import departmentApi from "@/api/department";
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    getDepartMentList() {
      departmentApi.getDepartMentList().then((res) => {
        this.$store.commit("setdepartmentLsit", res.data);
      });
    },
  },
  created() {
    this.getDepartMentList();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
