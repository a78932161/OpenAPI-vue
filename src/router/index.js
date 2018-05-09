import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/introduction/index'
import Layout from '@/components/Layout'
import ApiIndex from "@/components/apitest/ApiIndex"
import home from "@/components/home"
import addItem from "@/components/operating/addItem"
import upPassword from "@/components/operating/upPassword"
import itemSettings from "@/components/operating/itemSettings"
import login from "@/components/login"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children: [
        //子路由
        {path: 'api/:start/:end', component: ApiIndex},
        {path: '', component: Introduction}
      ]
    },
    {
      path: '/',
      name: '',
      component: home,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },//主页
    {
      path: '/addItem',
      name: 'addItem',
      component: addItem,
    },//添加项目
    {
      path: '/upPassword',
      name: 'upPassword',
      component: upPassword,
    },//修改密码
    {
      path: '/itemSettings',
      name: 'itemSettings',
      component: itemSettings,
    },//修改项目
    {
      path: '/login',
      name: 'login',
      component: login,
    }//登陆


  ]
})


