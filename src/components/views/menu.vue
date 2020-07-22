<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb></bread-crumb>
    <!-- 弹出层 -->
    <el-button type="primary" size="small" class="btn" @click="add">添加</el-button>
    <el-dialog
      :title="isadd ? '添加菜单':'编辑菜单'"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form :model="formInfo" :rules="rules" ref="ruleForm">
        <el-form-item label="菜单名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="formInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" :label-width="formLabelWidth" placeholder="请选择菜单">
          <el-select v-model="formInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in getStateMenu"
              :key="item.id"
              :label="item.titel"
              :value="item.id"
            >{{item.title}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio :disabled="formInfo.pid!=0" v-model="formInfo.type" label="1">目录</el-radio>
          <el-radio :disabled="formInfo.pid==0" v-model="formInfo.type" label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          :disabled="formInfo.pid!=0"
          v-if="formInfo.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input :disabled="formInfo.pid==0" v-model="formInfo.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="formInfo.type == 2" label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="formInfo.url"></el-input>
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
      :data="getStateMenu"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button size="mini" type="primary" @click="update">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入菜单接口
import {
  getMenuAdd,
  getMenuInfo,
  getMenuEdit,
  getMenuDelete
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
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1", //1目录2菜单
        status: "1"
      },
      enditId: 0,
      formLabelWidth: "120px",
      isadd: true,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择所属菜单", trigger: "blur" }]
      }
    };
  },
  methods: {
    //获取列表
    ...mapActions(["getActionMenu"]),
    //添加
    add() {
      this.dialogFormVisible = true;
      this.isadd = true;
    },
    //编辑
    update(id) {
      this.dialogFormVisible = true;
      this.isadd = false;
      getMenuInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res.data);
          // this.formInfo = res.data.list;
          // this.formInfo.type = this.formInfo.type.toString();
          // this.formInfo.status = this.formInfo.status.toString();
        }
      });
    },
    //删除
    del(id) {
      this.$confirm("确定删除该条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getMenuDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getActionMenu();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isadd) {
            //调取添加接口
            getMenuAdd(this.formInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionMenu();
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
            getMenuEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionMenu();
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
        pid: 0,
        tit: "",
        icon: "",
        url: "",
        type: "1",
        status: "1"
      };
    }
  },
  computed: {
    ...mapGetters(["getStateMenu"])
  },
  mounted() {
    this.getActionMenu();
  },
  components: {
    breadCrumb
  }
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
