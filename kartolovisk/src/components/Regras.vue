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
            <!--  <md-button class="md-raised md-accent" ><a id="menu" href="http://localhost:3000/" @click.prevent="logout()">SAIR</a></md-button> -->
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
          <div class="md-layout-item">
            <h1>Regras</h1>
            <p>O Kartolovisk é um game de futebol que permite que o jogador administre uma seleção próprio. Usando os resultados oficiais de cada partida da copa do mundo, o desempenho dos jogadores nas Seleções reais se transforma em pontos para os mesmos atletas nos times virtuais. Confira na abaixo como funciona este sistema de pontuação.</p>
            <p>Os pontos são recebidos (ou perdidos) de acordo com as atuações dos atletas em campo após cada jogo, através dos itens de scout. A pontuação geral, dada pela média dos pontos dos jogadores de cada time, determina a posição destas equipes no ranking das diferentes ligas nas quais eles estão inseridos, sejam públicas ou privadas.</p>
            <p>No início da Copa do Mundo são levados em consideração qualidades, características e o histórico profissional de cada atleta e técnico. Além disso, a cada rodada as estatísticas de desempenho dos jogadores são consolidadas e transformadas em pontos.</p>
          </div>
          <div class="md-layout-item">
            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <img src="../assets/soccer-player.png">
                  <h1 class="md-title">Scouts de Ataque</h1>
                </md-table-toolbar>
                <md-table-row>
                  <md-table-head>Scouts</md-table-head>
                  <md-table-head>Score</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>RB</md-table-cell>
                  <md-table-cell>89</md-table-cell>
                </md-table-row>
              </md-table>
            </div>

            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <img src="../assets/goalkeeper.png">
                  <h1 class="md-title">Scouts de Defesa</h1>
                </md-table-toolbar>
                <md-table-row>
                  <md-table-head>Scouts</md-table-head>
                  <md-table-head>Score</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>RB</md-table-cell>
                  <md-table-cell>89</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>
        </div>
      </md-app-content>

    </md-app>
  </div>
</template>

<style>
	.md-app {
    max-height: 700px;
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
</style>

<script>
import Sair from './Sair'
export default {
  
  components: {
   Sair
  },
  
  data: function(){
  }
}
	
</script>