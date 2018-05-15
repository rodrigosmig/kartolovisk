import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Noticias from '@/components/Noticias'
import Regras from '@/components/Regras'
import Sobre from '@/components/Sobre'
import Login from '@/components/Login'
import Cadastro from '@/components/Cadastro'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: Profile,
      component: Profile
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/noticias',
      name: 'Noticias',
      component: Noticias
    },
    {
      path: '/regras',
      name: 'Regras',
      component: Regras
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: Sobre
    }
  ]
})
