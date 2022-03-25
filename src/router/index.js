import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', icon: 'dashboard', requireAuth: true }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 异步路由
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    meta: { admin: true },
    redirect: '/user/userman',
    children: [
      {
        path: 'userman',
        name: 'User',
        component: () => import('@/views/User'),
        meta: { title: '用户管理', icon: 'dashboard', requireAuth: true }
      }
    ]
  },
  {
    path: '/studentandteacherinfo',
    component: Layout,
    name: 'SandTea',
    meta: { title: '师生信息管理', icon: 'dashboard', admin: true },
    redirect: '/studentandteacherinfo/student',
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/Student'),
        meta: { title: '学生信息管理', icon: 'dashboard', requireAuth: true }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/Teacher'),
        meta: { title: '教师信息管理', icon: 'dashboard', requireAuth: true }
      }
    ]
  },
  {
    path: '/gradeandteacher',
    component: Layout,
    name: 'GradeAndTeacher',
    redirect: '/gradeandteacher/grade',
    meta: { title: '班级和教师管理', icon: 'dashboard', admin: true },
    children: [
      {
        path: 'grade',
        name: 'Grade',
        component: () => import('@/views/Grade'),
        meta: { title: '班级管理', icon: 'dashboard', requireAuth: true }
      },
      {
        path: 'gradesteachers',
        name: 'GradeTeacher',
        component: () => import('@/views/GradeAndTeacher'),
        meta: { title: '班级分配教师管理', icon: 'dashboard', requireAuth: true }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    meta: { teacher: true },
    redirect: '/data/pdata',
    children: [
      {
        path: 'pdata',
        name: 'Data',
        component: () => import('@/views/Data'),
        meta: { title: '体侧数据管理', icon: 'dashboard', requireAuth: true }
      }
    ]
  },
  {
    path: '/center',
    component: Layout,
    meta: { teacher: true, student: true },
    redirect: '/center/percenter',
    children: [
      {
        path: 'percenter',
        name: 'Center',
        component: () => import('@/views/Center'),
        meta: { title: '个人中心', icon: 'dashboard', requireAuth: true }
      }
    ]
  }
]

// 任意路由
export const anyRoutes = [{ path: '*', redirect: '/404', hidden: true }]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.onReady(() => {
  router.addRoutes(store.state.user.speRoutes)
})

export default router
