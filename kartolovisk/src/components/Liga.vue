<template>
	<div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-large md-dense md-accent">
        <div class="md-toolbar-row">

					<div class="md-toolbar-section-start">
            <div class="separator">
              <md-avatar class="md=large">
                <img src="../assets/kremlin.png">
              </md-avatar>
            </div>
            <span class="md-title">Kartolovski</span>
          </div>

          <md-card class="card-menu">
            <div class="md-toolbar-section-end">
              <md-button><router-link to='/noticias' id="menu">NOTÍCIAS</router-link></md-button>
              <md-button><router-link to='/regras' id="menu">REGRAS</router-link></md-button>
              <md-button><router-link to='/sobre' id="menu">SOBRE</router-link></md-button>
              <!--<md-button class="md-raised md-accent" ><a id="menu" href="http://localhost:3000/" @click.prevent="logout()">SAIR</a></md-button>-->
              <sair></sair>
            </div>
          </md-card>

        </div>
            
        <div class="md-toolbar-row">
          <md-tabs class="md-accent" md-sync-route>
            <md-tab md-label="Meu Time" to="/Home"></md-tab>
              <md-tab md-label="Liga" to="/Liga"></md-tab>
              <md-tab md-label="Ranking" to="/Ranking"></md-tab>
              <md-tab md-label="Configuração" to="/Configuracao"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <div class="md-layout-item md-layout md-gutter">

          <div class="md-layout-item md-size-10">
              <div id="spac">
                <md-button class="md-raised md-accent">Criar Liga</md-button>
              </div>
          </div>

          <div class="md-layout-item md-size-40">
            <div id="spac">
              <md-card v-for="(l, index) in user_leagues" :key="index">
                <md-card-header>
                  <md-card-media>
                    <img src="../assets/pennant.png">
                  </md-card-media>
                  <md-card-header-text>
                    <div class="md-title">{{ l.name }}</div>
                  </md-card-header-text>
                </md-card-header>
                <md-card-actions>
                  <md-button class="md-raised md-accent">Deletar</md-button>
                  <md-button class="md-raised md-primary" @click="searchTeams(l.id)">Detalhes</md-button>
                </md-card-actions>
              </md-card>
            </div>
          </div>

          <div class="md-layout-item md-size-50">
            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Membros da Liga</h1>
                </md-table-toolbar>

                <md-table-row>
                  <md-table-head>Colocação</md-table-head>
                  <md-table-head>Nome do Time</md-table-head>
                  <md-table-head>Pontuação</md-table-head>
                  <md-table-head>Excluir</md-table-head>
                </md-table-row>

                <md-table-row v-for="(t, index) in league" :key="index">
                  <md-table-cell>{{ index + 1 }}</md-table-cell>
                  <md-table-cell>{{ t.name }}</md-table-cell>
                  <md-table-cell>{{ t.score }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-fab md-mini md-accent">
                      <md-icon>cancel</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>

              </md-table>
            </div>
          </div>

        </div>
      </md-app-content>

    </md-app>
  </div>
</template>

<script>
  import { eventBus } from '../main.js';
  import axios from 'axios'
  import Sair from './Sair'
  
  export default {
    components: {
      Sair
    },
    props: ['user'],
    created() {
      const url_user_league = "http://localhost:3000/league/user/" + this.user.id
      axios.get(url_user_league).then(response =>{
          this.user_leagues = response.data
      })  
    },
    data() {
      return {
        user_leagues: "",
        league: ""
      }
    },
    methods: {
      searchTeams: function(id) {
        const url_teams_league = "http://localhost:3000/league/list/" + id
        axios.get(url_teams_league).then(response =>{
          this.league = response.data
        })
      }
    },
  }
</script>

<style>
	.md-app {
    max-height: 100%;
    border: 1px solid rgba(#000,.12);
  }
	.card-menu{
    width: 70%;
  }
	#menu{
    color:white;
  }
  #spac{
    padding-top: 30px
  }
  #but{
    padding-bottom: 20px;
  }
</style>

