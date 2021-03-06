/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/Accueil'
import EditPlaylist from '@/components/EditPlaylist'
import CreerPlaylist from '@/components/CreerPlaylist'
import Login from '@/components/Login'
import Panel from '@/components/Panel'
import Invite from '@/components/Invite'
import Planning from '@/components/Planning'
import Podcasts from '@/components/Podcasts'
import Control from '@/components/Control'
import SignUp from '@/components/SignUp'
import PodcastUpload from '@/components/PodcastUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: Accueil
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
      path:'/podcastupload',
      name:'podcastupload',
      component: PodcastUpload
    },
    {
      path:'/invite',
      name:'invite',
      component: Invite
    },
    {
      path:'/signup',
      name:'signup',
      component: SignUp
    },
    {
      path:'/control',
      name:'control',
      component:Control
    }
    
  ]
})