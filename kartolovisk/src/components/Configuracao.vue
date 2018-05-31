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
        <h1>Configuração</h1>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item">
            <md-card>
              <md-card-header>
                <md-card-media>
                  <img src="../assets/configNick.png">
                </md-card-media>
                <md-card-header-text>
                  <div class="md-title">Editar Nickname</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                <md-field>
                    <label>Nickname Antigo</label>
                    <md-input name="nickname"></md-input>
                  </md-field>
                  <md-field>
                    <label>Nickname Novo</label>
                    <md-input name="nickname"></md-input>
                  </md-field>
              </md-card-content>
            </md-card>
          </div>
          <div class="md-layout-item">
            <md-card>
              <md-card-header>
                <md-card-media>
                  <img src="../assets/configTime.png">
                </md-card-media>
                <md-card-header-text>
                  <div class="md-title">Editar Nome do Time</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                <md-field>
                    <label>Nome Antigo</label>
                    <md-input name="nickname"></md-input>
                  </md-field>
                  <md-field>
                    <label>Nome Novo</label>
                    <md-input name="nickname"></md-input>
                  </md-field>
              </md-card-content>
            </md-card>
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
</style>

<script>
	
</script>