<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb></bread-crumb>
    <!-- 弹出层 -->
    <el-button type="primary" size="small" class="btn" @click="add">添加</el-button>
    <el-dialog
      :title="isadd ? '添加规格':'编辑规格'"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form :model="formInfo" :rules="rules" ref="ruleForm">
        <el-form-item label="规格名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="formInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="formInfo.status" label="1">启用</el-radio>
          <el-radio v-model="formInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isadd" type="primary" @click="subInfo('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="subInfo('ruleForm')">更 新</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="getStateUser" border style="width: 100%" row-key="id">
      <el-table-column prop="uid" label="规格编号"></el-table-column>
      <el-table-column prop="username" label="规格名称"></el-table-column>
      <el-table-column prop="rolename" label="规格属性"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button size="mini" type="primary" @click="update(item.row.uid)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageInfo.size"
      :total="count"
      @current-change="getPage"
    ></el-pagination>
  </div>
</template>

<script>
//引入规格接口
import {
  getUserAdd,
  getUserInfo,
  getUserEdit,
  getUserDelete,
  getUserCount,
} from "../../uitl/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入面包屑
import breadCrumb from "../common/breadcrumb";
export default {
  data() {
    return {
      count: 0, //总条数
      pageInfo: {
        size: 2, //一个页面显示的条数
        page: 1, //页数
      },
      dialogFormVisible: false,
      formInfo: {
        roleid: "",
        username: "",
        password: "",
        status: "1",
      },
      enditId: 0,
      formLabelWidth: "120px",
      isadd: true,
      rules: {
        username: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取列表
    ...mapActions(["getActionSpecs"]),
    //添加
    add() {
      this.dialogFormVisible = true;
      this.isadd = true;
      //调取角色列表
      this.getActionSpecs();
    },
    //编辑
    update(uid) {
      this.dialogFormVisible = true;
      this.isadd = false;
      getUserInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data);
          this.formInfo = res.data.list;
          this.formInfo.status = this.formInfo.status.toString();
        }
      });
    },
    //删除
    del(uid) {
      this.$confirm("确定删除该条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              //删除当前页面全部数据返回上一页
              if (
                Math.floor((parseInt(this.count) - 1) / this.pageInfo.size) ==
                  (parseInt(this.count) - 1) / this.pageInfo.size &&
                Math.ceil(parseInt(this.count) / parseInt(this.pageInfo.size)) -
                  parseInt(this.pageInfo.page) <
                  1
              ) {
                this.pageInfo.page = this.pageInfo.page - 1;
              }
              // 重新渲染
              this.$store.dispatch("getActionUser", this.pageInfo);
              this.$message.success(res.data.msg);
              this.getCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    subInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isadd) {
            //调取添加接口
            getUserAdd(this.formInfo).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.reset();
                this.getCount();
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.formInfo;
            data.id = this.enditId;
            //调取更新接口
            getUserEdit(data).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getCount();
                this.reset();
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消时让弹框内容清空
    cancel() {
      this.dialogFormVisible = false;
      this.reset();
    },
    reset() {
      this.formInfo = {
        roleid: "",
        username: "",
        password: "",
        status: "1",
      };
    },
    getCount() {
      getUserCount().then((res) => {
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          this.$store.dispatch("getActionUser", this.pageInfo);
        }
      });
    },
    getPage(n) {
      this.pageInfo.page = n;
      this.$store.dispatch("getActionUser", this.pageInfo);
    },
  },
  computed: {
    ...mapGetters(["getStateUser", "getStateSpecs"]),
  },
  mounted() {
    this.getCount();
  },
  components: {
    breadCrumb,
  },
};
</script>

<style lang="stylus" scoped>
.el-dialog {
  width: 40%;
}

.btn {
  margin: 12px 0;
}

.el-input {
  width: 85%;
}

.el-pagination {
  float: right;
  margin: 10px 0;
  font-weight: 500;
}
</style>
