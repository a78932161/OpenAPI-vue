<template>
  <div class="all">
    <el-card class="top">
      <div class="name">
        <label>修改密码</label>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名 :" prop="username">
          <el-input   v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="原密码 :" prop="oldPsw">
          <el-input type="password" v-model="ruleForm.oldPsw" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="newPsw">
          <el-input type="password" v-model="ruleForm.newPsw" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即修改</el-button>
          <el-button @click="goHome">返回主页</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      let old = (rule, value, callback) => {
        if(value === this.ruleForm.oldPsw) {
          callback(new Error('新密码和旧密码一样'));
        }
        else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          oldPsw: '',
          newPsw: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          oldPsw: [
            {required: true, message: '请输入原密码', trigger: 'blur'},

          ],
          newPsw: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: old, trigger: 'blur'}
          ],

        }
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
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
