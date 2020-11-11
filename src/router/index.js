import Vue from 'vue'
import Router from 'vue-router'
// import AddAddr from "../views/profile/childComps/address/AddAddress";
// import Clothes from "../views/recommend/Clothes";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Login = () => import('../views/profile/childComps/Login')
const SetUp = () => import('../views/setUp/SetUp')
const Register = () => import('../views/profile/childComps/Register')
const Detail = () => import('../views/detail/Detail')
const Search = () => import('../components/content/search/Search')
const Order = () => import('../views/order/Order')
const Address = () => import('../views/profile/childComps/address/Address')
const AddAddress = () => import('../views/profile/childComps/address/AddAddress')
const EditAddress = () => import('../views/profile/childComps/address/EditAddress')
const Settlement =() => import('../views/settlement/Settlement')
const OrderDetail = () => import('../views/order/OrderDetail')



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
    path: '/order',
    name: '全部订单',
    component: Order
  },
  {
    path: '/orderDetail',
    name: '订单详情',
    component: OrderDetail
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
    name: '编辑地址',
    component: EditAddress
  },
  {
    path: '/settlement',
    name: '修改地址',
    component: Settlement
  },
  {
    path: '/recommend',
    name: '热们推荐',
    component: () => import('../views/recommend/Recommend')
  },
  {
    path: '/comment',
    name: '商品评价',
    component: () => import('../views/order/OrderComment')
  },
  {
    path: '/business',
    name: '商家管理',
    component: () => import('../views/business/Business')
  },
  {
    path: '/adminGoods',
    name: '管理商品',
    component: () => import('../views/business/AdminGoods')
  },
  {
    path: '/editProduct/:id',
    component: () => import('../views/business/EditProduct')
  },
  {
    path: '/adminOrder',
    name: '管理订单',
    component: () => import('../views/business/AdminOrder')
  },
  {
    path: '/adminOrderDetail',
    name: '管理订单详情',
    component: () => import('../views/business/AdminOrderDetail')
  },
]
const router = new Router({
  // mode: 'history',
  routes
})

//3.导出router
export default router
