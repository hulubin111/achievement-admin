import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import $API from '@/api'

import dayjs from 'dayjs'

import ItemSearch from '@/components/ItemSearch'
import TableList from '@/components/TableList'
// 导入翻译的工具，过滤器
import '@/utils/transform.js'
Vue.component('ItemSearch', ItemSearch)
Vue.component('TableList', TableList)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('formatType', (v) => {
  let type = ''
  switch (v) {
    case '0':
      type = '管理员'
      break
    case '1':
      type = '教师'
      break
    case '2':
      type = '学生'
      break
  }
  return type
})

Vue.filter('formatDay', (val) => {
  var formatday
  if (val) {
    formatday = dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  } else {
    formatday = ''
  }
  return formatday
})

new Vue({
  el: '#app',
  beforeCreate() {
    Vue.prototype.$API = $API
  },
  store,
  router,
  render: (h) => h(App)
})
