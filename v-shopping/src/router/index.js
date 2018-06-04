import Vue from 'vue'
import Router from 'vue-router'
import goodList from '@/views/goodList'
import VueResource from 'vue-resource'
import cartShop from '@/views/cartShop'

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodList',
      component: goodList
    },
    {
      path:'/cart',
      name:'cartShop',
      component:cartShop
    }
  ]
})
