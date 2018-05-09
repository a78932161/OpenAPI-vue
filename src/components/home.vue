<template>
  <div class="top">
    <div class="logo">

      <label>OpenAPI</label>

      <el-dropdown>
        <span class="el-dropdown-link">
        <el-button type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="goPsw">修改密码</span></el-dropdown-item>
          <el-dropdown-item>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="item">
      <div class="card" v-for="item in listData">
        <a @click="goSetting(item)">{{item.name}}</a>
      </div>
      <div class="card">
        <a @click="goItem">新建项目+</a>
      </div>


    </div>
  </div>
</template>

<script>
  import {getProject} from "@/components/api/api";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        listData:[],
      }
    },
    methods: {
      goItem() {
        this.$router.push("/addItem");
      },
      goPsw() {
        this.$router.push("/upPassword");
      },
      goSetting(item) {
        this.$router.push({path:'/itemSettings',query:item});
      },
      getList() {
        getProject().then((res) => {
          console.log(res);
          if(res.data.code===1){
            this.listData=res.data.data;
          }
        })
      }
    },
    mounted() {
      this.getList();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    margin: 0 auto;
    text-align: center;
    max-width: 700px;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .logo {
    margin: 8% 0 8% 0;
    display: flex;
    justify-content: space-between;

  }

  .card {
    color: #777;
    font-weight: 700;
    height: 100px;
    width: 180px;
    margin-left: 5%;
    margin-bottom: 5%;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .055);
    border-radius: 5px;
  }

  .item a {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item a:hover {
    background: rgb(242, 245, 233);
    cursor: pointer;
  }

</style>
