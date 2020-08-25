const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/gov/views/login/login.vue'),
  meta: {
    title: '登录'
  }
}

export default login
