import { Icon } from '@bees/ui'
import Home from '@/pages/home'
import Dashboard from '@/pages/dashboard'
import SmartCity from '@/pages/smart-city'
import SmartPark from '@/pages/smart-park'
import SmartFactory from '@/pages/smart-factory'
import KingdomTears from '@/pages/Kingdom-Tears'
import Login from '@/pages/login'
import { RoutesProps } from './interface'

/**
 * @param {String} path 同作 key 用，保证所在有层级中的唯一性
 * @param {Boolean} pure 纯净的 false
 * @param {Boolean} hideMenu 不显示在菜单 false
 * @param {Object} style 额外样式
 * @param {Array} breadcrumb 面包屑 => null 不显示 | [{ name, link: '路由方式', href: '链接方式' }, ...]
 * @param {Boolean} needLogin 登录验证拦截 => false 无需验证拦截、true 开启验证拦截，默认：true
 * @param {Boolean} parentPath 父路径
 */
const routes: RoutesProps[] = [
  {
    name: '登录',
    path: '/login',
    element: <Login />,
    pure: true,
    hideMenu: true
  },
  {
    icon: <Icon type='home' />,
    name: '首页',
    path: '/home',
    element: <Home />
  },
  {
    name: '仪表盘',
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    name: '智慧城市',
    path: '/smart-city',
    element: <SmartCity />
  },
  {
    name: '智慧园区',
    path: '/smart-park',
    element: <SmartPark />
  },
  {
    name: '智慧工厂',
    path: '/smart-factory',
    element: <SmartFactory />
  },
  {
    name: '王国之泪',
    path: '/kingdom-tears',
    element: <KingdomTears />
  }
]

export default routes
