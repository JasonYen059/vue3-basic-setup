import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import mainLayout from '../layouts/main.vue'
import fullLayout from '../layouts/full.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title:'登入',
        layout: fullLayout
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title:'首頁',
        layout: mainLayout
      }
    },
    {
      path: '/system',
      component: () =>import('@/views/System/system.vue'),
      meta: {
        layout: mainLayout
      },
      children:[
        {
          path: '',
          name:'',
          redirect: '/404',
        },
        {
          path: 'sys001',
          name:'sys001',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'使用者管理'
          }
        },
      ]
    },
    {
      path: '/feature',
      component: () => import('@/views/Feature/index.vue'),
      meta:{
        layout: mainLayout
      },
      children: [
        {
          path: '',
          name:'',
          redirect: '/404',
        },
        {
          path: 'feat001',
          name:'feat001',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'房東管理'
          }
        },
        {
          path: 'feat002',
          name:'feat002',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'租客管理'
          }
        },
        {
          path: 'feat003',
          name:'feat003',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'媒合管理'
          }
        },
        {
          path: 'feat004',
          name:'feat004',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'保險管理'
          }
        },
        {
          path: 'feat005',
          name:'feat005',
          component: () => import('@/views/Feature/feat.vue'),
          meta:{
            title:'修繕管理'
          }
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'ErrorPage',
      meta: {
        layout: mainLayout
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/Error.vue'),
          name: '401',
          meta: {
            title: '401'
          }
        },
        {
          path: '403',
          component: () => import('@/views/Error.vue'),
          name: '403',
          meta: {
            title: '403'
          }
        },
        {
          path: '404',
          component: () => import('@/views/Error.vue'),
          name: '404',
          meta: {
            title: '404'
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  window.document.title = to.meta.title;
  const authStore = useAuthStore()
  if (!authStore.isAuth && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
