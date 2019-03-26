/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import Controls from '@/components/Controls'
import Playlists from '@/components/Playlists'
import EditPlaylist from '@/components/EditPlaylist'
import CreerPlaylist from '@/components/CreerPlaylist'

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
    }
  ]
})