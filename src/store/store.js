import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import '@/assets/underscore-min'
import '@/assets/dome'
import {copyArr} from 'common/util'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    leftNavStatus: false,//导航栏伸缩
    JSONData: {},//版本基础数据
    JSONData1: {},//比对版本基础数据
    tagsURL: [
      {name: '首页', type: '', path: '/layout'}
    ],//URL标签
    windowHeight: window.innerHeight,//获取高
    URL: '',
    contrast:null,//比对开关
    width: '100%',//比对样式
  },
  mutations: {
    changeLeftNav(state) {
      state.leftNavStatus = !state.leftNavStatus
    },//伸缩导航栏
    initJSONData(state) {//从后台获取数据

    },//获取版本基础数据
    initJSONData1(state) {

    },//获取比对版本基础数据

    addTabs(state, newTab) {//添加标签
      /*state.tagsURL.push(newTab)*/
    },
    chengeHeight(state) {
      state.windowHeight = window.innerHeight;
      //console.log(state.windowHeight)
    }//记录高的位置
  },
  getters: { //解析Json
    getSwaggerVersion: state => {
      return state.JSONData.swagger;
    },
    getInfo: state => {
      return state.JSONData.info;
    },
    getHost: state => {
      return state.JSONData.host;
    },
    getTags: state => {
      return state.JSONData.tags;
    },
    getPaths: state => {
      return state.JSONData.paths;
    },
    getDefinitions: state => {
      return state.JSONData.definitions;
    },

    getSwaggerVersion1: state => {
      return state.JSONData1.swagger;
    },
    getInfo1: state => {
      return state.JSONData1.info;
    },
    getHost1: state => {
      return state.JSONData1.host;
    },
    getTags1: state => {
      return state.JSONData1.tags;
    },
    getPaths1: state => {
      return state.JSONData1.paths;
    },
    getDefinitions1: state => {
      return state.JSONData1.definitions;
    },

    getFriendlyPaths: (state, getters) => {//获取友好的path对象，原生的path对象太复杂不方便取数
      let paths = getters.getPaths;
      if (!paths) return false;
      let friendlyPaths = [];
      //console.log(friendlyPaths);
      //遍历第一层
      for (let key in paths) {
        let friendlyPath = {};
        friendlyPath.path = key;
        let tem = paths[key];
        //遍历第二层
        for (let key in tem) {
          friendlyPath.sendWay = key;
          let tem2 = tem[key];
          friendlyPath.tags = tem2.tags;
          friendlyPath.summary = tem2.summary;
          friendlyPath.description = tem2.description;
          friendlyPath.operationId = tem2.operationId;
          friendlyPath.consumes = tem2.consumes;
          friendlyPath.produces = tem2.produces;
          friendlyPath.parameters = tem2.parameters;
          friendlyPath.responses = tem2.responses;
          //friendlyPath.cud = "update"
          //friendlyPath.target = oldfriendlyPath;
        }
        friendlyPaths.push(friendlyPath);
      }
      return friendlyPaths;
    },

    getFriendlyPaths1: (state, getters) => {//获取友好的path对象，原生的path对象太复杂不方便取数
      let paths1 = getters.getPaths1;
      if (!paths1) return false;
      let friendlyPaths1 = [];
      //console.log(friendlyPaths1);
      //遍历第一层
      for (let key in paths1) {
        let friendlyPath1 = {};
        friendlyPath1.path = key;
        let tem = paths1[key];
        //遍历第二层
        for (let key in tem) {
          friendlyPath1.sendWay = key;
          let tem2 = tem[key];
          friendlyPath1.tags = tem2.tags;
          friendlyPath1.summary = tem2.summary;
          friendlyPath1.description = tem2.description;
          friendlyPath1.operationId = tem2.operationId;
          friendlyPath1.consumes = tem2.consumes;
          friendlyPath1.produces = tem2.produces;
          friendlyPath1.parameters = tem2.parameters;
          friendlyPath1.responses = tem2.responses;

        }
        friendlyPaths1.push(friendlyPath1);
      }
      return friendlyPaths1;
    },//处理版本JSON

    getMenuTreeObj1: (state, getters) =>
    {//获取完整的、友好的菜单树，包括所有信息
      console.log('getMenuTreeObj1');
      let tagsArry = copyArr(getters.getTags);
      let tagsArry1 = copyArr(getters.getTags1);
      let pathArry = copyArr(getters.getFriendlyPaths);
      let pathArry1 = copyArr(getters.getFriendlyPaths1);
      let tags = [];
      let tags1 = [];
      let tags2 = [];
      if (!tagsArry) return false;
      if (!tagsArry1) return false;
      if (!pathArry) return false;
      if (!pathArry1) return false;
      let pathData = _.pluck(pathArry, 'path');
      let pathData1 = _.pluck(pathArry1, 'path');
      let delData = _.difference(pathData, pathData1);
      let addData = _.difference(pathData1, pathData);
      let unData = _.intersection(pathData, pathData1);
      delData.forEach((value) => {//删除的数组
        for (let i = 0; i < pathArry.length; i++) {
          if (value === pathArry[i].path) {
            pathArry[i].type = '删除';
            tags.push(pathArry[i]);
          }
        }
      });
      addData.forEach((value) => {//删除的数组
        for (let i = 0; i < pathArry1.length; i++) {
          if (value === pathArry1[i].path) {
            pathArry1[i].type = '新增';
            tags.push(pathArry1[i])
          }
        }
      });
      unData.forEach((value) => {//未知旧数组
        for (let i = 0; i < pathArry1.length; i++) {
          if (value === pathArry1[i].path) {
            tags1.push(pathArry1[i])
          }
        }
      });
      unData.forEach((value) => {//未知新数组
        for (let i = 0; i < pathArry.length; i++) {
          if (value === pathArry[i].path) {
            tags2.push(pathArry[i])
          }
        }
      });
      if (tags1.length === tags2.length) {
        for (let i = 0; i < tags1.length; i++) {
          if (_.isEqual(tags1[i], tags2[i])) {
            tags1[i].type = '相同';
          } else {
            tags1[i].type = '修改';
            tags.push(tags1[i]);
          }
        }
      }
      for (let i = 0; i < tagsArry1.length; i++) {//遍历标签
        let name = tagsArry1[i].name;
        let tag = tagsArry1[i];
        tag.paths = [];
        for (let i = 0; i < tags.length; i++) { //遍历paths查找对应的详情数据
          if (tags[i].tags[0].indexOf(name) >= 0) {
            tag.paths.push(tags[i]);
          }
        }
      }
      tagsArry = tagsArry1;
      console.log(tagsArry);
      return tagsArry;
    },

    getMenuTreeObj: (state, getters) => {//获取完整的、友好的菜单树，包括所有信息
      console.log('getMenuTreeObj');
      let tagsArry = copyArr(getters.getTags);
      let pathArry = copyArr(getters.getFriendlyPaths);
      if (!tagsArry) return false;
      if (!pathArry) return false;
      for (let i = 0; i < tagsArry.length; i++) {//遍历标签
        let name = tagsArry[i].name;
        let tag = tagsArry[i];
        tag.paths = [];
        for (let i = 0; i < pathArry.length; i++) { //遍历paths查找对应的详情数据
          if (pathArry[i].tags[0].indexOf(name) >= 0) {
            tag.paths.push(pathArry[i]);
          }
        }
      }
      return tagsArry;
    },//处理比对版本JSON


    statisticsHTTP: (state, getters) => {
      //统计各请求的个数
      let get = 0;
      let post = 0;
      let del = 0;
      let put = 0;
      let pathArry = getters.getFriendlyPaths;
      for (let i = 0; i < pathArry.length; i++) {
        if (pathArry[i].sendWay == 'get') {
          get += 1;
        }
        if (pathArry[i].sendWay == 'post') {
          post += 1;
        }
        if (pathArry[i].sendWay == 'delete') {
          del += 1;
        }
        if (pathArry[i].sendWay == 'put') {
          put += 1;
        }
      }

      let others = pathArry.length - get - post - del - put;
      return {
        'get': get,
        'post': post,
        'del': del,
        'put': put,
        'others': others
      }
    },//统计各请求的个数
  },
  plugins: [createLogger()]
});
