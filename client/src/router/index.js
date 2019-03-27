/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import Controls from '@/components/Controls'
import Planning from '@/components/Planning'
import Playlists from '@/components/Playlists'
import EditPlaylist from '@/components/EditPlaylist'
import CreerPlaylist from '@/components/CreerPlaylist'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import PoadcastUpload from '@/components/PoadcastUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/planning',
      name: 'planning',
      component: Planning
    },
    {
      path: '/controls',
      name: 'controls',
      component: Controls
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
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/poadcastupload',
      name:'poadcastupload',
      component: PoadcastUpload
    },
    {
      path:'/signup',
      name:'signup',
      component: SignUp
    }
  ]
})