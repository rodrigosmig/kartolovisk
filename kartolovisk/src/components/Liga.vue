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
          <div class="md-layout-item md-size-30">
            <div id="spac">

              <div id="but">
                <md-button class="md-raised md-accent">Criar Liga</md-button>
              </div>

              <div id="but">
                <md-card>
                  <md-card-header>
                    <md-card-media md-medium>
                      <img src="../assets/brasao2.png">
                    </md-card-media>
                    <md-card-header-text>
                      <div class="md-title">Nome da Liga</div>
                      <div class="md-subhead">Pontuação</div>
                    </md-card-header-text>
                  </md-card-header>
                  <md-card-actions>
                    <md-button class="md-raised">Detalhes</md-button>
                  </md-card-actions>
                </md-card>
              </div>
              <md-card>
                <md-card-header>
                  <md-card-media md-medium>
                    <img src="../assets/brasao2.png">
                  </md-card-media>
                  <md-card-header-text>
                    <div class="md-title">Nome da Liga</div>
                    <div class="md-subhead">Pontuação</div>
                  </md-card-header-text>
                </md-card-header>
                <md-card-actions>
                  <md-button class="md-raised">Detalhes</md-button>
                </md-card-actions>
              </md-card>

            </div>
          </div>

          <div class="md-layout-item">
            <div id="spac">
              <md-table md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Membros da Liga</h1>
                </md-table-toolbar>

                <md-table-row>
                  <md-table-head>Nome do Time</md-table-head>
                  <md-table-head>Pontuação</md-table-head>
                </md-table-row>

                <md-table-row>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>100</md-table-cell>
                </md-table-row>

                <md-table-row>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>100</md-table-cell>
                </md-table-row>

                <md-table-row>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>100</md-table-cell>
                </md-table-row>

                <md-table-row>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>100</md-table-cell>
                </md-table-row>

                <md-table-row>
                  <md-table-cell>Brisa FC</md-table-cell>
                  <md-table-cell>100</md-table-cell>
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
    padding-top: 30px
  }
  #but{
    padding-bottom: 20px;
  }
</style>

<script>
	
</script>