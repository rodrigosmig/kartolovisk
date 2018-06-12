<template>
  <div class="page-container">
    <div v-if="authorized">
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
                <md-button class="md-raised md-accent" ><a id="menu" href="http://localhost:8080/#/" @click.prevent="logout()">SAIR</a></md-button>
              </div>
            </md-card>
          </div>
            
          <div class="md-toolbar-row">
            <md-tabs class="md-accent" md-sync-route>
              <md-tab md-label="Meu Time"></md-tab>
              <md-tab md-label="Liga" to="/Liga"></md-tab>
              <md-tab md-label="Ranking" to="/Ranking"></md-tab>
              <md-tab md-label="Configuração" to="/Configuracao"></md-tab>
            </md-tabs>
          </div>
        </md-app-toolbar>
            
        <md-app-content>

          <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item">
              <p>Time</p>
              <h1>{{ team.name }}</h1>
              <md-button v-if="change_formation === true" @click="edit_formation" class="md-raised md-accent">Salvar Formação</md-button>
              
            </div>
            <div class="md-layout-item">
              <p>Escalação</p>
              <h1>{{ formation.formation }}</h1>
            </div>
            <div class="md-layout-item">
              <p>Pontuação</p>
              <h1>{{ team.score }}</h1>
            </div>
          </div>
          <md-divider></md-divider>

          <p>{{ messagem }}</p>
          <div class="md-layout-item md-layout md-gutter">

            <div class="md-layout-item">
              <md-card-content class="campo">
                <formacao @message="notice" :team=team :players=team_players :formation=formation></formacao>
              </md-card-content>
            </div>
          
            <div class="md-layout-item">
              <md-card-content>
                <buscar-jogador @clickBuscarJogador="searchName"></buscar-jogador>
              </md-card-content>
          
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
                    <EsquemaTatico :formation="formation"></EsquemaTatico>
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
                    <md-table-cell v-if="hasPlayer(player) === false">
                      <md-button class="md-fab md-mini md-accent" @click="addPlayer(index)">
                        <md-icon>add</md-icon>
                      </md-button>
                    </md-table-cell>
                    <md-table-cell v-else>
                      <md-button class="md-fab md-mini md-accent" disabled>
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
  data: function(){
    return {
      user: "",
      team_players: "",
      players: [],
      team: "",
      formation: "",
      user_leagues: "",
      authorized:false,
      messagem: "",
      change_formation: false,
      }     
  },
  created() {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    if(token !== null){
      this.authorized = true
    }
    const url_user = "http://localhost:3000/users/name/" + username
    axios.get(url_user).then(response => {
      this.user = response.data
      localStorage.setItem('id', this.user.id)
      localStorage.setItem('email', this.user.email)

      //busca time do usuario e sua formação
      const url_team = "http://localhost:3000/teams/" + this.user.id
      axios.get(url_team).then(response => {
        this.team = response.data
        const url_formation = "http://localhost:3000/formation/" + this.team.formationId
        axios.get(url_formation).then(formation => {
          this.formation = formation.data;
          //busca os jogadores do time do usuario
          const url_team_players = "http://localhost:3000/teams/players/" + this.user.id
          axios.get(url_team_players).then(response => {
            if(response.data.length === 0) {
              this.team_players = []
            }
            else {
              this.team_players = response.data
            }        
          })
        })
      })
    }).catch (e =>{
          alert(e.response.data.error)
        });

    eventBus.$on('message', message => {
      this.notice(message)
    });
    eventBus.$on('changeScheme', scheme => {
      this.formation = scheme
      this.team_players = []
      this.change_formation = true
    });
    eventBus.$on('remove_player', player => {
      for(let x in this.team_players) {
        if(this.team_players[x].id === player.id) {
          this.team_players.splice(x, 1)
          break
        }
      }
      console.log(player.id)
      const url_remove_player = "http://localhost:3000/teams/players/" + this.user.id
      axios.delete(url_remove_player, {data: {player: player.id}})
        .catch(error => {
            console.log("Erro")
        })
    });
    eventBus.$on('add_player', player => {
      this.team_players.push(player)
      const url_add_players = "http://localhost:3000/teams/players/" + this.user.id
      axios.post(url_add_players, {"player": player.id})
        .catch(error => {
            console.log("Erro")
        })
    });
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
    },
    hasPlayer(player) {
      for(let p of this.team_players) {
        if(p.id === player.id) {
            return true
        }
      }
      return false
    },
    edit_formation: function() {
      const data = {
        "formation": this.formation.id,
      }
      
      const url_edit_formation = "http://localhost:3000/teams/" + this.user.id
      console.log(url_edit_formation, "formation")
      axios.put(url_edit_formation, data)
        .catch(error => {
            console.log("Erro")
        })
      this.change_formation = false
      this.messagem = "Formação alterada com sucesso"
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
   #menu{
    color:white;
  }
</style>
