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
</style>

<script>
	
</script>