<template>
  <div class="all">
    <el-card class="top">
      <div class="name">
        <label>项目设置</label>
      </div>
      <div style="margin-bottom: 5%">
        <template>
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="基础信息" name="first">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="项目名称 :" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目地址 :" prop="url">
                  <el-input v-model="ruleForm.url" placeholder="如果修改了API请更新URL" @blur="getDoc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button style="width: 50%" @click="tijiao">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="成员管理" name="second">
              <el-button type="text" @click="openAdd">添加</el-button>
              <el-table
                :data="tableData3"
                height="250"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="时间">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="高级设置" name="third">
              <div style="text-align: center">
                <el-button style="width: 50%">删除</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史版本" name="version">
              当前版本为:{{a.version}}
              <el-table
                :data="versionData"
                height="250"
                style="width: 100%">
                <el-table-column
                  prop="version"
                  label="版本名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="createDate"
                  label="时间">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="swap(scope.row)">切换</el-button>
                    <el-button type="text" size="small" @click="contrast(scope.row)">比对</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>

          </el-tabs>
        </template>
      </div>
      <div class="anniu">
        <el-button type="primary" style="width: 60%" @click="goLayout">进入项目</el-button>
        <el-button style="width: 60%" @click="goHome">返回首页</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
  import {getProjectid, upItemApi, getApi} from "@/components/api/api";

  export default {
    data() {
      return {
        a: [],
        version: '',
        doc: '',
        activeName2: 'first',
        ruleForm: {
          name: '',
          url: '',
        },
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '请输入项目地址', trigger: 'blur'},
          ],
        },
        versionData: [],
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      openAdd() {
        this.$prompt('请输入用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '你的用户名是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      goLayout() {
        let a = this.a.apiDoc;
        let b = JSON.parse(a);
        this.$store.state.JSONData = b.apiDoc;
        this.$router.push('/Layout');
      },
      contrast(row) {
        let a = this.a.apiDoc;
        let b = JSON.parse(a);
        if(b.apiDoc){
          this.$store.state.JSONData = b.apiDoc;
        }else{
          this.$store.state.JSONData = b;
        }
        let c = row.apiDoc;
        let d = JSON.parse(c);
        if(d.apiDoc){
          this.$store.state.JSONData = d.apiDoc;
        }else{
          this.$store.state.JSONData = d;
        }


        this.$store.state.JSONData1 = d.apiDoc;
        this.$store.state.contrast = true;
        this.$router.push('/Layout');
      },
      getList() {
        let a = {
          projectId: this.$route.query.id,
        };
        getProjectid(a).then((res) => {
          this.ruleForm.name = this.$route.query.name;
          this.versionData = res.data.data;
          this.versionData.forEach((value) => {
            value.createDate = this.getLocalTime(value.createDate);
          });
          this.versionData.reverse();
          this.a = this.versionData[0];
        });
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      swap(row) {
        this.a = row;
      },
      tijiao() {
        if (this.ruleForm.url) {
          let a = {
            projectId: this.$route.query.id,
            version: this.version,
          };
          let b = {
            apiDoc: this.doc,
          };
          upItemApi(a, b).then((res) => {
            if (res.data.code === 1) {
              this.$message({
                message: '修改项目成功!',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改失败!',
                type: 'warning'
              });
            }
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }
      },
      getDoc() {
        getApi(this.ruleForm.url).then((res) => {
          this.version = res.data.info.version;
          this.doc = res.data;
        })
      }
    },
    mounted() {
      this.getList();
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
    margin-bottom: 5%;
  }

  .anniu {
    display: flex;
  }
</style>
