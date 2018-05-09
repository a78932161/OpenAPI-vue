<template>
  <el-container>
    <el-aside width="asideWidth">
      <!--坐标导航栏-->
      <v-NvaLeft></v-NvaLeft>
    </el-aside>
    <el-main>
      <!--顶部Tabs-->
      <el-row>
        <el-col :span="24">
          <v-tabs></v-tabs>
        </el-col>
      </el-row>
      <!--接口详情页面路由-->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-main>
  </el-container>

</template>

<script>
  import NvaLeft from "./NvaLeft"
  import Tabs from "./Tabs"

  export default {
    data: function () {
      return {
        asideWidth: '300px'
      }
    },
    components: {
      'v-NvaLeft': NvaLeft,
      'v-tabs': Tabs,
    },
    computed: {},
    created() {//初始化请求后台获取API数据
      // if(this.$store.state.contrast){
      //   this.$store.commit('initJSONData');
      //   this.$store.commit('initJSONData1');
      // }else{
      //   this.$store.commit('initJSONData');
      // }

      let _this = this;
      window.onresize = function () {
        _this.$store.commit('chengeHeight');
      }
    }
  }
</script>

<style scoped>
  main {
    padding: 0;
    margin: 0
  }
</style>
