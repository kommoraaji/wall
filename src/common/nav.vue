<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="item in getStateMenu" :key="item.id" :index="item.id.toString()">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="valu in item.children"
              :key="valu.id"
              :index="valu.url"
            >{{valu.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMenuList } from "../uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home"
    };
  },
  computed: {
    ...mapGetters(["getStateMenu"])
  },
  mounted() {
    // console.log(this.$route);
    this.defaultActive = this.$route.path;
    this.getActionMenu();
  },
  methods: {
    ...mapActions(["getActionMenu"])
  }
};
</script>

<style lang="stylus" scoped>
.el-menu {
  min-height: 800px;
  text-align: left;
}
</style>
