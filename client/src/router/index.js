/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Acceuil from '@/components/Acceuil'
import Planning from '@/components/Planning'
import Podcasts from '@/components/Podcasts'
import Panel from '@/components/Panel'
import EditPlaylist from '@/components/EditPlaylist'
import CreerPlaylist from '@/components/CreerPlaylist'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

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
    },
    {
      path: '/editplaylist',
      name: 'editplaylist',
      component: EditPlaylist
    },
    {
      path: '/creerplaylist',
      name: 'creerplaylist',
      component: CreerPlaylist
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/signup',
      name:'signup',
      component: SignUp
    }
  ]
})