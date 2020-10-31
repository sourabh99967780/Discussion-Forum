import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import ThreadShow from '@/pages/PageThreadShow'
import ThreadCreate from '@/pages/PageThreadCreate'
import ThreadEdit from '@/pages/PageThreadEdit'
import Forum from '@/pages/PageForum'
import Profile from '@/pages/PageProfile'
import Register from '@/pages/PageRegister'
import SignIn from '@/pages/PageSignIn'
import NotFound from '@/pages/PageNotFound'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () =>
        import(/* webpackChunkName: "category" */ '../pages/PageCategory.vue'),
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: () =>
        import(/* webpackChunkName: "forum" */ '../pages/PageForum.vue'),
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: () =>
        import(
          /* webpackChunkName: "threadCreate" */ '../pages/PageThreadCreate.vue'
        ),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: () =>
        import(
          /* webpackChunkName: "threadShow" */ '../pages/PageThreadShow.vue'
        ),
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: () =>
        import(
          /* webpackChunkName: "threadEdit" */ '../pages/PageThreadEdit.vue'
        ),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me',
      name: 'Profile',
      component: () =>
        import(/* webpackChunkName: "profile" */ '../pages/PageProfile.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: () =>
        import(
          /* webpackChunkName: "profileEdit" */ '../pages/PageProfile.vue'
        ),
      props: { edit: true },
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () =>
        import(/* webpackChunkName: "register" */ '../pages/PageRegister.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () =>
        import(/* webpackChunkName: "SignIn" */ '../pages/PageSignIn.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/logout',
      name: 'SignOut',
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        store.dispatch('auth/signOut').then(() => next({ name: 'Home' }))
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: () =>
        import(/* webpackChunkName: "notFound" */ '../pages/PageNotFound.vue')
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // protected route
  store.dispatch('auth/initAuthentication').then(user => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (user) {
        next()
      } else {
        next({ name: 'SignIn', query: { redirectTo: to.path } })
      }
    } else if (to.matched.some(route => route.meta.requiresGuest)) {
      if (!user) {
        next()
      } else {
        next({ name: 'Home' })
      }
    } else {
      next()
    }
  })
})

export default router
