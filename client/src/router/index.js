/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Acceuil from '@/components/Acceuil'
import Planning from '@/components/Planning'
import Podcasts from '@/components/Podcasts'
import Panel from '@/components/Panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'acceuil',
      component: Acceuil
    },
    {
      path: '/planning',
      name: 'planning',
      component: Planning
    },
    {
      path: '/podcasts',
      name: 'podcasts',
      component: Podcasts
    },
    {
      path: '/panel',
      name: 'panel',
      component: Panel
    }
  ]
})