import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category.vue')
const Car = () => import('../views/car/Car.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')
// const Login=()=>import('../views/login/Login.vue');

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component:Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/car',
    component:Car
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  // url模式
  mode:'history'
})

export default router
