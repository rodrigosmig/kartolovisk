<template>

    <md-card-content>
              <div class="form">
                <md-field>
                  <label>Procurar Jogador</label>
                    
                    <md-input autofocus   v-model="buscarNome"
                    @keyup.13="searchPlayer">

                    </md-input>
                </md-field>
              </div>
    </md-card-content>
   
</template>

<script>

export default {

     data: () => ({        
           buscarNome:""
    }),

     methods: {
        searchPlayer: function() {
            const nome = this.buscarNome.toLowerCase();
            this.$emit("clickBuscarJogador", nome)
        }
    }
}
</script>
