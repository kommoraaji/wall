<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb></bread-crumb>
    <!-- 弹出层 -->
    <el-button type="primary" size="small" class="btn" @click="add">添加</el-button>
    <el-dialog
      :title="isadd ? '添加商品分类':'编辑商品分类'"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form :model="cateInfo" :rules="rules" ref="cateInfo">
        <el-form-item label="上级分类" prop="pid" :label-width="formLabelWidth" placeholder="请选择分类">
          <el-select v-model="cateInfo.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in getStateCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename" :label-width="formLabelWidth">
          <el-input v-model="cateInfo.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="filelist"
            :auto-upload="false"
            :on-change="changeInfo"
          >
            <!-- :auto-upload="false"  取消自动上传 -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="cateInfo.status" label="1">启用</el-radio>
          <el-radio v-model="cateInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isadd" type="primary" @click="subInfo('cateInfo')">确 定</el-button>
        <el-button v-else type="primary" @click="subInfo('cateInfo')">更 新</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="getStateCate"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img class="imgInfo" :src="'http://localhost:3000/'+item.row.img" alt />
        </template>
      </el-table-column>
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
//引入分类接口
import {
  getCateAdd,
  getCateInfo,
  getCateEdit,
  getCateDelete,
} from "../../uitl/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入面包屑
import breadCrumb from "../common/breadcrumb";
export default {
  data() {
    return {
      filelist: [],
      dialogImageUrl: "",
      uploadImg: "", //上传后的图片地址
      dialogVisible: false,
      dialogFormVisible: false,
      cateInfo: {
        pid: "",
        catename: "",
        img: "",
        status: "1",
      },
      enditId: 0,
      formLabelWidth: "120px",
      isadd: true,
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择所属分类", trigger: "blur" }],
      },
    };
  },
  methods: {
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片放大
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeInfo(file) {
      this.uploadImg = file.raw;
    },
    //获取列表
    ...mapActions(["getActionCate"]),
    //添加
    add() {
      this.dialogFormVisible = true;
      this.isadd = true;
    },
    //编辑
    update(id) {
      this.dialogFormVisible = true;
      this.isadd = false;
      getCateInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.cateInfo = res.data.list;
          this.cateInfo.status = this.cateInfo.status.toString();
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
          getCateDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getActionCate();
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
          let data = this.cateInfo;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.uploadImg);
          if (this.isadd) {
            //调取添加接口
            getCateAdd(file).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionCate();
                this.reset();
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.cateInfo;
            data.id = this.enditId;
            //调取更新接口
            getCateEdit(data).then((res) => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogFormVisible = false;
                this.$message.success(res.data.msg);
                this.getActionCate();
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
      this.dialogImageUrl = "";
      this.cateInfo = {
        pid: "",
        catename: "",
        img: "",
        status: "1",
      };
    },
  },
  computed: {
    ...mapGetters(["getStateCate"]),
  },
  mounted() {
    this.getActionCate();
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

.imgInfo {
  width: 100px;
}
</style>
