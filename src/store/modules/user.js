
import { resetRouter } from '@/router'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/'
import router from '@/router/index.js'
import { login } from '@/api/user.js'

const getDefaultState = () => {
  return {
    userid: sessionStorage.getItem('USERID'),
    type: sessionStorage.getItem('TYPE'),
    username: sessionStorage.getItem('NAME'),
    resultRoutes: [],
    speRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  // 设置用户id
  SETUSERID(state, userid) {
    state.userid = userid
  },
  SETTYPE(state, type) {
    state.type = type
  },
  SETNAME(state, name) {
    state.username = name
  },
  RESETSTATE(state) {
    Object.assign(state, getDefaultState())
  },
  SETRESULTROUTES(state, result) {
    state.resultRoutes = result
  },
  SETSPECIAL(state, sp) {
    state.speRoutes = sp
  }
}

const actions = {
  // 登录
  async login({ commit, dispatch, state }, data) {
    try {
      const result = await login(data)
      sessionStorage.setItem('USERID', result)
      sessionStorage.setItem('TYPE', data.type)
      sessionStorage.setItem('NAME', data.user)
      commit('SETUSERID', result)
      commit('SETTYPE', data.type)
      commit('SETNAME', data.user)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  logout({ commit }) {
    sessionStorage.removeItem('USERID')
    sessionStorage.removeItem('TYPE')
    sessionStorage.removeItem('NAME')
    commit('RESETSTATE')
    resetRouter()
  },
  // 计算出最终的路由
  //
  resultRoutes({ commit, state }) {
    if (state.type === '0') {
      const r = asyncRoutes.filter(item => item.meta.admin === true)
      commit('SETRESULTROUTES', constantRoutes.concat(r))
      commit('SETSPECIAL', r)
      // 动态添加路由
      router.addRoutes([...r, ...anyRoutes])
    } else if (state.type === '1') {
      const r = asyncRoutes.filter(item => item.meta.teacher === true)
      commit('SETRESULTROUTES', constantRoutes.concat(r))
      commit('SETSPECIAL', r)
      // 动态添加路由
      router.addRoutes([...r, ...anyRoutes])
    } else if (state.type === '2') {
      const r = asyncRoutes.filter(item => item.meta.student === true)
      // console.log(router)
      // console.log(r, '计算出来的')
      // console.log(this.$router.options.routes, '侧边栏')
      commit('SETRESULTROUTES', constantRoutes.concat(r, anyRoutes))
      commit('SETSPECIAL', r)

      // 动态添加路由
      router.addRoutes([...r, ...anyRoutes])
    }
  }

  // resetRouter()
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}

