import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Noticias from '@/components/Noticias'
import Regras from '@/components/Regras'
import Sobre from '@/components/Sobre'
import Login from '@/components/Login'
import Cadastro from '@/components/Cadastro'
import Liga from '@/components/Liga'
import Ranking from '@/components/Ranking'
import Configuracao from '@/components/Configuracao'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/liga',
      name: 'Liga',
      component: Liga
    },
    {
      path: '/Ranking',
      name: 'Ranking',
      component: Ranking
    },
    {
      path: '/Configuracao',
      name: 'Configuracao',
      component: Configuracao
    }
  ]
})
