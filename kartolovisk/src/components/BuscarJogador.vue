<template>


    <div class="form">
        <md-field>
            <label>Procurar Jogador</label>                    
                <md-input autofocus   v-model="buscarNome" @keyup.13="searchPlayer">
            </md-input>
        </md-field>
    </div>
   
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
