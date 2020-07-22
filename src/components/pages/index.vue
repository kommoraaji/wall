<template>
  <div>
    <el-container>
      <el-header>后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../../common/nav";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {
    vNav
  }
};
</script>

<style lang="stylus" scoped>
.el-header, .el-footer 
  background-color rgb(85,94,105);
  color #fff;
  font-size 24px;
  text-align left;
  line-height 60px;

.el-aside
  background-color #d3dce6;
  color #333;
  text-align center;
  line-height 200px;

.el-main
  background-color #e9eef3;
  color #333;
  text-align left;
  // line-height 50px;

body > .el-container
  margin-bottom 40px;

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside
  line-height 260px;

.el-container:nth-child(7) .el-aside 
  line-height 320px;
</style>
