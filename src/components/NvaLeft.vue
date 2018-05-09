<template>
<div class="leftBar" :style = "{width : changeLeftNavStyle,height: this.$store.state.windowHeight+'px'}" >
    <el-menu default-active="-1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" :collapse="changeLeftNav"  text-color="#fff"
             active-text-color="#409EFF" background-color="#324157">
      <el-menu-item index="-1" @click="toIndex">
        <i class="el-icon-menu"></i>
        <span slot="title" >项目简介</span>
      </el-menu-item>
    <el-submenu index="index" v-for="(item, index) in getAPI" :key="item.name">
        <template slot="title">
          <span class="el-icon-star-off"></span>
        <span slot="title" >{{item.name}}</span>
        </template>
        <span v-for="(item2, index2) in item.paths" @click="goApi(index,index2,item2.summary)">
        <el-menu-item  :index="index +'-'+ index2">{{item2.summary}}
          {{item2.type}}
        </el-menu-item>
        </span>

    </el-submenu>
    </el-menu>
</div>
</template>

<script>
export default {
    name : 'NvaLeft',
    data() {
      return {
        changeLeftNavStyle :  '250px',
        tags : [],
        paths : [],
        realData : []
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      goApi(index,index2,summary){
        //跳转路由
        this.$router.push('/Layout/api/'+index+'/'+index2)
      },
      toIndex(){
        this.$router.push('/Layout');
        // this.$router.go(0);
      }
    },
    computed : {
        changeLeftNav () {
          this.changeLeftNavStyle = this.$store.state.leftNavStatus ? null : '250px';
          return this.$store.state.leftNavStatus
        },//改导航栏
        getAPI(){
          if (this.$store.state.contrast) {
            return this.$store.getters.getMenuTreeObj1;
          }else{
            return this.$store.getters.getMenuTreeObj;
          }
        }//获取数据

    },
    mounted(){
      console.log(this.getAPI);
    }

  }
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
.leftBar {
    overflow:auto;
    margin: 0;
    background-color:#324157;
  }
  .el-menu-vertical-demo {
      border: 0
  }
  a {text-decoration:none}

</style>

