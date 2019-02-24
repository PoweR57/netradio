/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import Controls from '@/components/Controls'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/controls',
      name: 'controls',
      component: Controls
    }
  ]
})