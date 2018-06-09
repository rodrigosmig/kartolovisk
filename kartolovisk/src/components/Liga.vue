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
                <md-button class="md-raised md-accent" @click="showDialog = true">Criar Liga</md-button>
                <md-button class="md-raised md-accent" @click="showDialogSearch = true">Pesquisar Liga</md-button>
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
                  <md-button class="md-raised md-accent" @click.prevent="removeLeague(l.id)">Deletar</md-button>
                  <md-button class="md-raised md-primary" @click.prevent="searchTeams(l.id)">Detalhes</md-button>
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

      <!-- Modal para adicionar liga -->
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Nova Liga</md-dialog-title>

          <md-dialog-content>
            <input type="text" v-model="new_league_name" placeholder="Digite o nome da liga">
          </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Fechar</md-button>
        <md-button class="md-primary" @click="addleague">Salvar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- modal para pesquisar liga -->
    <md-dialog :md-active.sync="showDialogSearch">
        <md-dialog-title>Pesquisar Liga</md-dialog-title>

          <md-dialog-content>
            <input type="text" v-model="search_league_name" placeholder="Digite o nome da liga">
            <md-button class="md-primary" @click="searchLeague">Buscar</md-button>

            <md-table md-card>
                <md-table-row>
                  <md-table-head>ID</md-table-head>
                  <md-table-head>Nome da Liga</md-table-head>
                  <md-table-head>Times</md-table-head>
                  <md-table-head>Participar</md-table-head>
                </md-table-row>
                <md-table-row v-for="(league, index) in search_leagues" :key="index">
                  <md-table-cell>{{league.id}}</md-table-cell>
                  <md-table-cell>{{league.name}}</md-table-cell>
                  <md-table-cell>0</md-table-cell>
                  <md-table-cell v-if="hasLeague(league.id) === false">
                    <md-button class="md-fab md-mini md-accent">
                        <md-icon>add</md-icon>
                      </md-button>
                  </md-table-cell>
                  <md-table-cell v-else>
                    <md-button class="md-fab md-mini md-accent" disabled>
                        <md-icon>add</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>


          </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogSearch = false">Fechar</md-button>
      </md-dialog-actions>
    </md-dialog>

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
    created() {
      this.user.id = localStorage.getItem("id")
      this.user.nickname = localStorage.getItem("username")

      const url_user_league = "http://localhost:3000/league/user/" + this.user.id
      axios.get(url_user_league).then(response =>{
          this.user_leagues = response.data
      }).catch(e => {
        this.user_leagues = []
      })
    },
    data() {
      return {
        user: {
          nickname: "",
          id: ""
        },
        user_leagues: "",
        league: "",
        search_leagues: "",
        new_league_name: "",
        search_league_name: "",
        showDialog: false,
        showDialogSearch: false,
        message: "",
      }
    },
    methods: {
      searchTeams: function(id) {
        const url_teams_league = "http://localhost:3000/league/list/" + id
        axios.get(url_teams_league).then(response =>{
          this.league = response.data
        })
      },
      addleague: function() {
        const data = {
          userId: this.user.id,
          name: this.new_league_name
        }
        const url_new_league = "http://localhost:3000/league/"
        axios.post(url_new_league, data).then(response =>{
          this.user_leagues.push(response.data)
          this.new_league_name = ""
          this.showDialog = false
        })
      },
      removeLeague: function(id) {
        const url_remove_league = "http://localhost:3000/league/" + id
        let index = ""
        for(let x in this.user_leagues) {
          if(this.user_leagues[x].id === id) {
            index = x 
            break
          }
        }
        axios.delete(url_remove_league).then(response =>{         
          this.user_leagues.splice(index, 1)
        }).catch(e => {
          this.message = "Liga não pode ser deletada"
        })
      },
      searchLeague: function() {
        const url_league = "http://localhost:3000/league/name/" + this.search_league_name
        axios.get(url_league).then(response =>{
            this.search_leagues = response.data
        })
      },
      hasLeague: function(id) {
        for(let l of this.user_leagues) {
          if(l.id === id) {
            return true
          }
        }
        return false
      }
    },
  }
</script>

<style scoped>
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

