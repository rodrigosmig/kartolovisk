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
      	<h1>Sobre</h1>
        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item" id="text">
            <p>O Kartolovski é o jogo onde você pode montar seu próprio time com os jogadores reais da Copa do Mundo 2018. Você pode acompanhar a copa de maneira divertida competindo com os seus amigos e outros Kartolovos para ver quem sabe tudo de futebol e escolhe os melhores jogadores</p>
            <p>Um jogo intuitivo no estilo de fantasy game, em que o usuário possa escalar sua própria seleção da copa do mundo, baseado nos jogadores das seleções que estão convocadas para a copa do mundo de 2018</p>
          </div>
        </div>

        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item">
            <img src="../assets/strategy.png">
            <p>Escale seus jogadores sem nenhum custo.</p>
          </div>
          <div class="md-layout-item">
            <img src="../assets/soccer-game.png">
            <p>A cada rodada da Copa do Mundo, o seu time pontua baseado em suas ações nas partidas</p>
          </div>
          <div class="md-layout-item">
            <img src="../assets/winners.png">
            <p>Compartilhe a sua escalação e divirta-se com seus amigos e família.</p>
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
  #text{
    padding-right: 200px;
    padding-left: 200px;
    padding-bottom: 30px;
  }
</style>

<script>
	
</script>

