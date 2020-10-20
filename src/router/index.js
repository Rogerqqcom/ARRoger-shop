import Vue from 'vue'
import Router from 'vue-router'
import AddAddr from "../views/profile/childComps/address/AddAddress";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Login = () => import('../views/profile/childComps/Login')
const SetUp = () => import('../views/setUp/SetUp')
const Register = () => import('../views/profile/childComps/Register')
const Detail = () => import('../views/detail/Detail')
const Search = () => import('../views/home/childComps/Search')
const AllOrder = () => import('../views/order/AllOrder')
const WaitPay = () => import('../views/order/WaitPay')
const WaitRec = () => import('../views/order/WaitRec')
const Address = () => import('../views/profile/childComps/address/Address')
const AddAddress = () => import('../views/profile/childComps/address/AddAddress')
const EditAddress = () => import('../views/profile/childComps/address/EditAddress')



//1.安装插件
Vue.use(Router)

//2.创建路由对象
const routes = [
  {
    path:'',
    redirect: '/home',
    meta: {
      isTab: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isTab: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      isTab: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      isTab: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isTab: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/setup',
    component: SetUp
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/allOrder',
    name: '全部订单',
    component: AllOrder
  },
  {
    path: '/waitPay',
    name: '待付款',
    component: WaitPay
  },
  {
    path: '/waitRec',
    name: '待收货',
    component: WaitRec
  },
  {
    path: '/address',
    name: '地址管理',
    component: Address
  },
  {
    path: '/addAddress',
    name: '添加地址',
    component: AddAddress
  },
  {
    path: '/editAddress',
    name: '修改地址',
    component: EditAddress
  }
]
const router = new Router({
  mode: 'history',
  routes
})

//3.导出router
export default router
