import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default-dark.css'
import App from './App'
import Liga from './components/liga.vue'
import Ranking from './components/ranking.vue'
import Configuracao from './components/configuracao.vue'
import MeuTime from './components/meutime.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [{path: '/liga', component: Liga}, {path: '/ranking', component: Ranking}, {path: '/configuracao', component: Configuracao}, {path: '/meutimeu', component: MeuTime}
]

const router = new VueRouter({routes: routes})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: router,
  render: h => h(App)
}).$mount('#app')
