import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    component:()=>import('@/view/index')
  },{
    path:'/gobang',
    component:()=>import('@/view/goBang/index')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
