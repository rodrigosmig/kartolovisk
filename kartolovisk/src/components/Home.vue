<template>


  <div class="page-container">

     <div v-if="authorized">
            <md-app md-waterfall md-mode="fixed-last">
          <md-app-toolbar class="md-large md-dense md-accent">
            <div class="md-toolbar-row">

              <div class="md-toolbar-section-start">
                <div class="separator">
                  <md-avatar class="md=large">
                    <img src="../assets/russia.png">
                  </md-avatar>
                </div>
                <span class="md-title">Kartolovski</span>
              </div>

              <md-card class="card-menu">
                <div class="md-toolbar-section-end">
                  <md-button><router-link to='/noticias' id="menu">NOTÍCIAS</router-link></md-button>
                  <md-button><router-link to='/regras' id="menu">REGRAS</router-link></md-button>
                  <md-button><router-link to='/sobre' id="menu">SOBRE</router-link></md-button>
                  <md-button class="md-raised md-accent" ><a id="menu" href="http://localhost:3000/" @click.prevent="logout()">SAIR</a></md-button>
                </div>
              </md-card>
            </div>
            
             <div class="md-toolbar-row">
                  <md-tabs class="md-accent">
                    <md-tab md-label="Meu Time"></md-tab>
                    <md-tab md-label="Liga"></md-tab>
                    <md-tab md-label="Ranking"></md-tab>
                    <md-tab md-label="Configuração"></md-tab>
                  </md-tabs>
                </div>
              </md-app-toolbar>
            
            <md-app-content>
              <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item">
                  <md-card-content class="campo">
                    <formacao @message="notice"></formacao>
                  </md-card-content>
             </div>
          
            <div class="md-layout-item">
            
            <md-card-content>
              <buscar-jogador @clickBuscarJogador="searchName"></buscar-jogador>
            </md-card-content>
            
            <p>{{ messagem }}</p>
            
              <div class="md-layout-item md-layout md-gutter">
                  <div class="md-layout-item">
                    <md-card-content>                      
                        <selecao @clickSelecao="searchSelecao"></selecao>
                    </md-card-content>
                  </div>

                  <div class="md-layout-item">
                    <md-card-content>
                    <posicao @clickPosition="search"></posicao> 
                    </md-card-content>
                  </div>

                  <div class="md-layout-item">
                    <md-card-content>
                        <EsquemaTatico @clickScheme="searchScheme"></EsquemaTatico>
                    </md-card-content>
                  </div>
                </div>

                <div>
                  <md-table md-card>
                    <md-table-row>
                        <md-table-head>Camisa</md-table-head>
                        <md-table-head>Nome do Jogador</md-table-head>
                        <md-table-head>País</md-table-head>
                        <md-table-head>Posição</md-table-head>
                        <md-table-head>Pontuação</md-table-head>
                        <md-table-head>Adicionar</md-table-head>
                    </md-table-row>

                    <md-table-row v-for="(player, index) in players" :key="player.id">
                      <md-table-cell>IMG</md-table-cell>
                      <md-table-cell>{{player.name}}</md-table-cell>
                      <md-table-cell>{{player.country}}</md-table-cell>
                      <md-table-cell>{{player.position}}</md-table-cell>
                      <md-table-cell>{{player.score}}</md-table-cell>
                      <md-table-cell>
                        <md-button class="md-fab md-mini md-accent" @click="addPlayer(index)">
                          <md-icon>add</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>

                    <!-- <player-list :players="players"></player-list> -->

                  </md-table>
              </div>

          </div>

        </div>
      </md-app-content>

    </md-app>

    </div>

    <div v-else>
        Nao autenticado
    </div>


  </div>
</template>
<script>
import { eventBus } from '../main.js';
import axios from 'axios'
import Posicao from './Posicao'
import PlayerList from './PlayerList'
import Formacao from './Formacao'
//import Barra from './Barra'
import Selecao from './Selecao'
import BuscarJogador from './BuscarJogador'
import EsquemaTatico from './EsquemaTatico'

export default {
  components: {
    Posicao,
    PlayerList,
    Formacao,
    Selecao,
    BuscarJogador,
    EsquemaTatico
  },
  name: 'LastRowFixed',
  data(){
    return {
      players: [],
      user: {
        nickname: ""
      },
      authorized:false,
      messagem: ""
      }
      
  },

  created: function(){
      const token = localStorage.getItem("token")

      if(token !== null){
        this.authorized = true

        axios
        .get("http://localhost:3000/profile", {headers:{"x-access-token":token}}).then(response => {
            this.user.nickname = response.data.nickname
        })
        .catch(e =>{
            console.log("não esta autenticado")
        })
      }
      
  },

  methods: {
    search: function(position) {
      const url = "http://localhost:3000/players/position/" + position
      axios.get(url)
        .then(response => {
          this.players = response.data
        })
        .catch(error => {
            console.log("Erro")
        })
    },
    searchName: function(name) {
      const url = "http://localhost:3000/players/name/" + name
      console.log(url)
      axios.get(url)
        .then(response => {
          this.players = response.data
        })
        .catch(error => {
            console.log("Erro")
        })
    },
    
    searchSelecao: function(pais){
      const url = "http://localhost:3000/players/country/" + pais
      axios.get(url)
        .then(response => {
          this.players = response.data
        })
        .catch(error => {
            console.log("Erro")
        })
    },
    
    searchScheme: function(scheme) {
     
    },
    
    logout: function() {
      localStorage.removeItem("token")
      this.$router.push({name: "Login"})
    },
    addPlayer: function(index) {
      let player = this.players[index]
      eventBus.$emit("adicionaJogador", player)
    },
    notice: function(message) {
      this.messagem = message
    }
  }
}

</script>

<style lang="scss" scoped>
  .md-app {
    max-height: 700px;
    border: 1px solid rgba(#000,.12);
  }
  .card-menu{
    width: 70%;
  }
  .campo {
    background-image: url("../assets/campo.jpg");
    width: 425px;
    height: 548px;
    margin-left: 15%;
    margin-top: 5%;
  }

   #menu{
    color:white;
  }


  
</style>
