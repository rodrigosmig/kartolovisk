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
              <md-button class="md-raised md-accent" ><a id="menu" href="http://localhost:3000/" @click.prevent="logout()">SAIR</a></md-button>
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
        <div class="md-layout md-gutter">

          <div class="md-layout-item">
            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <img src="../assets/trophy.png">
                  <h1 class="md-title">Top Ligas Globais</h1>
                </md-table-toolbar>
                <md-table-row>
                  <md-table-head>Colocação</md-table-head>
                  <md-table-head>Nome da Liga</md-table-head>
                  <md-table-head>Pontuação</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisantes</md-table-cell>
                  <md-table-cell>10394</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>

          <div class="md-layout-item">
            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <img src="../assets/fan.png">
                  <h1 class="md-title">Top Times Globais</h1>
                </md-table-toolbar>
                <md-table-row>
                  <md-table-head>Colocação</md-table-head>
                  <md-table-head>Nome do Time</md-table-head>
                  <md-table-head>Pontuação</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell>1</md-table-cell>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>134</md-table-cell>
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
    padding-top: 30px;
  }
</style>

<script>
	
</script>