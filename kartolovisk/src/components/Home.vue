<template>

  <div class="page-container">
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
              <md-button><router-link to='/noticias'>NOTÍCIAS</router-link></md-button>
              <md-button><router-link to='/regras'>REGRAS</router-link></md-button>
              <md-button><router-link to='/sobre'>SOBRE</router-link></md-button>
              <md-button class="md-raised md-accent">Sair</md-button>
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
              <formacao></formacao>
            </md-card-content>
          </div>

          <div class="md-layout-item">

            <!-- <md-card-content>
              <div class="form">
                <md-field>
                  <label>Procurar Jogador</label>
                  <md-input v-model="jogador" autofocus></md-input>
                </md-field>
              </div>
            </md-card-content> -->

            <div class="md-layout-item md-layout md-gutter">
              <div class="md-layout-item">
                <md-card-content>
                  <md-menu md-size="medium" md-align-trigger>
                    <md-button md-menu-trigger>Seleção</md-button>
                    <md-menu-content>
                      <md-menu-item>My Item 1</md-menu-item>
                      <md-menu-item>My Item 2</md-menu-item>
                      <md-menu-item>My Item 3</md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </md-card-content>
              </div>

              <div class="md-layout-item">
                <md-card-content>
                <posicao @clickPosition="search"></posicao> 
                </md-card-content>
              </div>

              <div class="md-layout-item">
                <md-card-content>
                  <md-menu md-size="medium" md-align-trigger>
                    <md-button md-menu-trigger>Esquema Tático</md-button>
                    <md-menu-content>
                      <md-menu-item>My Item 1</md-menu-item>
                      <md-menu-item>My Item 2</md-menu-item>
                      <md-menu-item>My Item 3</md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </md-card-content>
              </div>
            </div>

            <div>
              <md-table md-card>
                <md-table-row>
                    <md-table-head>Imagem</md-table-head>
                    <md-table-head>Nome do Jogador</md-table-head>
                    <md-table-head>País</md-table-head>
                    <md-table-head>Posição</md-table-head>
                    <md-table-head>Pontuação</md-table-head>
                    <md-table-head>Detalhes</md-table-head>
                </md-table-row>

                <md-table-row v-for="player in players" :key="player.id">
                  <md-table-cell>IMG</md-table-cell>
                  <md-table-cell>{{player.name}}</md-table-cell>
                  <md-table-cell>{{player.country}}</md-table-cell>
                  <md-table-cell>{{player.position}}</md-table-cell>
                  <md-table-cell md-numeric>{{player.score}}</md-table-cell>
                  <md-table-cell>DT</md-table-cell>
                </md-table-row>

                <!-- <player-list :players="players"></player-list> -->

              </md-table>
          </div>

          </div>

        </div>
      </md-app-content>

    </md-app>
  </div>
</template>

<script>
import axios from 'axios'
import Posicao from './Posicao'
import PlayerList from './PlayerList'
import Formacao from './Formacao'

export default {
  components: {
    Posicao,
    PlayerList,
    Formacao
  },
  name: 'LastRowFixed',
  data(){
    return {
      players: []
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
    }
  }
}

</script>

<style lang="scss" scoped>
  .md-app {
    max-height: 100%;
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

</style>
