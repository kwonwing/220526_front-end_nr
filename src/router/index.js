import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //  /, /tutorials 메뉴를 클릭하면 TutorialsList.vue 로딩
  // tutorialsList.vue : Tutorial 목록 화면 
  {
    path: '/',
    alias:"/tutorials",
    name: 'tutorials',
    component: ()=> import('@/components/TutorialsList')
  },
  // tutorial.vue : Tutorial 상세 화면 
  {
    path: '/tutorials/:id',
    name: '/tutorial-details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:  ()=> import('@/components/Tutorial')
  },
  // //  Addtutorial.vue : Tutorial 에 목록 추가 화면 
  {
    path: '/add',
    name: '/add',
    component:  ()=> import('@/components/AddTutorial')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
