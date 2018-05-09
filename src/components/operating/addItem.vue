<template>
  <div class="all">
    <el-card class="top">
      <div class="name">
        <label>添加新项目</label>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="项目名称 :" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="API地址 :" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入API地址" @blur="getDoc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">立即创建</el-button>
          <el-button @click="goHome">返回主页</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import {addItemApi,getApi} from '@/components/api/api'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          url: '',
        },
        version:'',
        doc:'',
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '请输入项目地址', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      add(){
        let a={
          name:this.ruleForm.name,
          version:this.version,
        };
        let b={
          apiDoc:this.doc,
        };
        console.log(a,b);
        addItemApi(a,b).then((res)=>{

          if(res.data.code===1){
            this.$router.push('/');
            this.$message({
              message: '添加项目成功!',
              type: 'success'
            });
          }else{
            this.$message({
              message: '添加失败!',
              type: 'warning'
            });
          }

        })
      },
      getDoc(){
        getApi(this.ruleForm.url).then((res)=>{
          console.log(res);
          this.version=res.data.info.version;
          this.doc=res.data;
        })
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>

  .top {
    margin: 8% auto;
    width: 30%;
  }

  .top label {
    font-size: 20px;
  }

  .name {
    text-align: center;
    margin-bottom: 3%;
  }

</style>
