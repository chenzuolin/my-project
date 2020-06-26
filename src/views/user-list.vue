<template>
  <div>
    <el-form
      :inline="true"
      :model="paramsPage.params"
      class="demo-form-inline"
      style="padding: 10px 0 0"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="paramsPage.params.userName"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select
          v-model="paramsPage.params.userDepartment"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in departmentLsit"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="userBirthday"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getByPage">查询</el-button>
        <el-button type="danger" @click="toAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="dataPage.list" style="width: 100%" height="500">
      <el-table-column
        fixed
        prop="userId"
        label="ID"
        width="200"
      ></el-table-column>
      <el-table-column prop="userName" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="userSex" label="性别">
        <template slot-scope="scope">
          {{ scope.row.userSex === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="userAge" label="年龄"> </el-table-column>
      <el-table-column prop="userBirthday" label="生日"> </el-table-column>
      <el-table-column prop="department.name" label="部门" align="center">
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="toUpdate(scope.row.userId)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteById(scope.row.userId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paramsPage.pageNumber"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataPage.totalCount"
    >
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="user" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="user.userAge"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="user.userSex" :label="1">男</el-radio>
          <el-radio v-model="user.userSex" :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            style="width: 100%"
            v-model="user.userBirthday"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            style="width: 100%"
            v-model="user.userDepartment"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in departmentLsit"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer title="用户修改" :visible.sync="updateDrawer" direction="rtl">
      <el-form :model="user" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="user.userAge"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="user.userSex" :label="1">男</el-radio>
          <el-radio v-model="user.userSex" :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            style="width: 100%"
            v-model="user.userBirthday"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            style="width: 100%"
            v-model="user.userDepartment"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in departmentLsit"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="updateDrawer = false">取 消</el-button>
      <el-button type="primary" @click="updateUser">确 定</el-button>
    </el-drawer>
  </div>
</template>
<script>
import userApi from "@/api/user";
export default {
  name: "userList",
  data() {
    return {
      paramsPage: {
        pageNumber: 1,
        pageSize: 20,
        params: {},
      },
      dataPage: {},
      departmentLsit: [],
      userBirthday: "",
      addDialog: false,
      updateDrawer: false,
      user: {}, //添加用户
    };
  },
  methods: {
    deleteById(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        userApi.delById(id).then((res) => {
          this.$message.success("删除成功！！！");
          this.getByPage();
        });
      });
    },
    toUpdate(id) {
      userApi.getById(id).then((res) => {
        this.user = res.data;
        this.updateDrawer = true;
      });
    },
    updateUser() {
      userApi.updateById(this.user).then((res) => {
        this.$message.success(res.msg);
        this.getByPage();
        this.updateDrawer = false;
      });
    },
    toAdd() {
      this.addDialog = true;
    },
    saveUser() {
      userApi.save(this.user).then((res) => {
        this.addDialog = false;
        this.getByPage();
        this.$message.success(res.msg);
      });
    },
    getByPage() {
      if (this.userBirthday) {
        this.paramsPage.params.userBirthdayStart = this.userBirthday[0];
        this.paramsPage.params.userBirthdayEnd = this.userBirthday[0];
      } else {
        this.paramsPage.params.userBirthdayStart = "";
        this.paramsPage.params.userBirthdayEnd = "";
      }
      userApi.getByPage(this.paramsPage).then((res) => {
        this.dataPage = res.data;
      });
    },
    handleSizeChange(val) {
      this.paramsPage.pageSize = val;
      this.getByPage();
    },
    handleCurrentChange(val) {
      this.paramsPage.pageNumber = val;
      this.getByPage();
    },
  },
  created() {
    this.getByPage();
  },
  watch: {
    "$store.getters.departmentList": function(newVal, oldVal) {
      this.departmentLsit = newVal;
    },
  },
};
</script>
