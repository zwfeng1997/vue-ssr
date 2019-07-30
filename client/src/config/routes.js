export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'APP',
    component: () => import('../views/tood/todo.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  }
]
