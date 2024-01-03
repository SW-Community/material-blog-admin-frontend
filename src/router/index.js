import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import TopicManageView from '../views/TopicManageView.vue'
import UserManageView from '../views/UserManageView.vue'
import MainPostListView from '../views/MainPostListView.vue'
import EditPostView from '../views/EditPostView.vue'
import FoPostListView from '../views/FoPostListView.vue'
import MediaListView from '../views/MediaListView.vue'
import ErrorView from '../views/ErrorView.vue'

import ComingSoonView from '../views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path:'/topicManage',
      name:'topicManage',
      component:TopicManageView
    },
    {
      path: '/userManage',
      name:'userManage',
      component:UserManageView
    },
    {
      //可选筛选条件
      path: '/mpostManage/:uid?',
      name:'mpostManage',
      component:MainPostListView
    },
    {
      path:'/mpostManage/edit/:mid',
      name:'editPost',
      component:EditPostView
    },
    {
      path:'/comingSoon',
      component:ComingSoonView
    },
    {
      path:'/fopstManage',
      component:FoPostListView
    },
    {
      path:'/mediaManage',
      component:MediaListView
    },
    {
      path:'/error',
      component:ErrorView
    }
  ]
})

export default router
