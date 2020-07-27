<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb></bread-crumb>
    <!-- 弹出层 -->
    <el-button type="primary" size="small" class="btn" @click="add">添加</el-button>
    <el-dialog
      :title="isadd ? '添加角色':'编辑角色'"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form :model="formInfo" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" prop="rolename" :label-width="formLabelWidth">
          <el-input v-model="formInfo.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="rolename" :label-width="formLabelWidth">
          <el-tree
            :data="getStateMenu"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
          ></el-tree>
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
    <el-table
      :data="getStateRole"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button size="mini" type="primary" @click="update(item.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入角色接口
import {
  getRoleAdd,
  getRoleInfo,
  getRoleEdit,
  getRoleDelete,
} from "../../uitl/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入面包屑
import breadCrumb from "../common/breadcrumb";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formInfo: {
        rolename: "",
        menus: "",
        status: "1",
      },
      enditId: 0,
      formLabelWidth: "120px",
      isadd: true,
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    //获取列表
    ...mapActions(["getActionRole", "getActionMenu"]),
    //添加
    add() {
      this.dialogFormVisible = true;
      this.isadd = true;
    },
    //编辑
    update(id) {
      this.dialogFormVisible = true;
      this.isadd = false;
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.formInfo = res.data.list;
          this.formInfo.status = this.formInfo.status.toString();
        }
      });
    },
    //删除
    del(id) {
      this.$confirm("确定删除该条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getRoleDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getActionRole();
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
    //确定添加或者更新
    subInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isadd) {
            this.formInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
            // console.log(this.formInfo);
            //调取添加接口
            getRoleAdd(this.formInfo).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionRole();
                this.reset();
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
            getRoleEdit(data).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionRole();
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
        rolename: "",
        menus: "",
        status: "1",
      };
      this.$refs.tree.setCheckedKeys([]);
    },
  },
  computed: {
    ...mapGetters(["getStateRole", "getStateMenu"]),
  },
  mounted() {
    this.getActionRole();
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
</style>
