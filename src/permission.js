import router from '@/router/'
import store from '@/store/index.js'
router.beforeEach((to, from, next) => {
  const userid = store.state.user.userid
  // console.log(userid)
  // console.log(1111)
  const resultRoutes = store.state.user.resultRoutes
  if (userid) {
    if (to.path === '/login') {
      next(false)
    } else {
      if (resultRoutes.length === 0) {
        store.dispatch('resultRoutes')
        next()
      } else {
        // console.log(444)
        next()
      }
    }
  } else {
    if (to.meta.requireAuth) {
      next('/login')
    }

    next()
  }
})

