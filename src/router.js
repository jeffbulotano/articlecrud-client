import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "create" */ '@/views/Create.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import(/* webpackChunkName: "edit" */ '@/views/Edit.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue')
    }
  ]
})
