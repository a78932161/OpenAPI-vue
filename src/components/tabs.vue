<template>
<div class="unify-tabs">
    <el-row>
        <el-col :span="1">
            <div class="contract-btn" @click="changeLeftNav">

                <!-- <b>
                    <i class="iconfont icon-all"></i></b>
                <b> -->
             <!-- <i class="iconfont icon-all"></i></b> -->
             <i :class="iconName"></i>
             <!-- <i class="iconfont">&#xe699;</i> -->
            </div>
        </el-col>
        <!-- <el-col :span="4" class="projectName"> -->
            <!-- <el-breadcrumb separator="/" class = "unify-tabs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表接口</el-breadcrumb-item>
                <el-breadcrumb-item>查询</el-breadcrumb-item>
            </el-breadcrumb> -->
            <!-- <b>信息中心展晒平台API接口文档</b> -->
        <!-- </el-col> -->
        <el-col :span="23" class = "topBar">
            <!-- <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name">
                {{item.content}}
            </el-tab-pane>
            </el-tabs> -->
            <!-- <span v-for="tag in tags" @click="clickTab(tag.name)">
            <el-tag
            :key="tag.name"
            :closable = "isIndex(tag.name)"
            :type="tag.type"
            @close="handleClose(tag)"
            >
            {{tag.name}}
            </el-tag>
            </span> -->
            <el-button type="success" round @click="goIndex">退出项目</el-button>
        </el-col>
    </el-row>

    </div>
</template>

<script>
export default {
  data() {
      return {
        tags:this.$store.state.tagsURL,
        iconName : 'el-icon-d-arrow-left'
      }
    },
    methods: {
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      changeLeftNav () {
          this.iconName = this.$store.state.leftNavStatus ? 'el-icon-d-arrow-left':'el-icon-d-arrow-right'
           this.$store.commit('changeLeftNav')
        },
      goIndex(){
        this.$router.push('/');
        this.$router.go(0);

      }
    },
    computed : {

    }
}
</script>

<style scoped>
.el-tabs {
    /* width: 2000px */
}
.contract-btn {
    border-bottom: 1px solid #DFE4ED;
    height: 41px;
    line-height: 41px;
    margin-left: 5px;
    font-size: 25px;
    color: #409EFF;
    cursor :pointer;
}
.unify-tabs {
     border-bottom: 1px solid #DFE4ED;
    height: 41px;
    line-height: 41px;
}
.el-tag {
  margin-right: 5px;
  z-index: -1;
  cursor:pointer
}
.projectName {
  /* background-color: #42B983; */
  color : #42B983
}
.tabsLine {
  /* border-bottom: 1px solid #DFE4ED; */
  line-height: 40px;
  box-shadow: 2px 2px 5px #888888;
  margin-bottom: 15px;
}
.topBar{
  text-align: right;
  padding-right: 20px
}
</style>

