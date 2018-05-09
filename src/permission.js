/**
 * Created by LHZQAQ on 2017/12/29.
 */


import router from '@/router'
  router.beforeEach((to, from, next) => {
  const nextRoute =['/login'];

  if(localStorage.getItem('token')){
    if(to.path==='/login'){
      next({path: 'home'});
    }
    else{
      next();
    }
  }
  else{
    if(nextRoute.indexOf(to.path)!==-1){
      next();
    }
    else{
      next('/login');
    }
  }
});

