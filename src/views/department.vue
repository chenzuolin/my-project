<template>
  <div>
    <template>
      <el-table :data="department" border style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import departmentApi from "@/api/department";
export default {
  name: "department",
  data() {
    return {
      department: [],
    };
  },
  methods: {
    getDepartMentList() {
      departmentApi.getDepartMentList().then((res) => {
        this.department = res.data;
        this.$store.commit("setdepartmentLsit", res.data);
      });
    },
  },
  created() {
    this.getDepartMentList();
  },
};
</script>
