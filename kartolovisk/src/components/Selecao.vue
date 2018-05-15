<template>

<md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>SELEÇÃO</md-button>
        <md-menu-content>
            <md-menu-item @click="searchSelecao(index)" 
            v-for="(p, index) in paises" 
            :key=index>{{ p }}</md-menu-item>
        </md-menu-content>
    </md-menu>
   
</template>

<script>
export default {

     data: () => ({        
        paises: [
            'Egito',
            'Rússia',
            'Arábia Saudita',
            'Uruguai',
            
            'Irã',
            'Marrocos',
            'Portugal',
            'Espanha',

            'Austrália',
            'Dinamarca',
            'França',
            'Peru',

            'Argentina',
            'Croácia',
            'Islândia',
            'Nigéria',

            'Brazil',
            'Costa Rica',
            'Sérvia',
            'Suíça',

            'Alemanha',
            'Coreia do Sul',
            'México',
            'Suécia',

            'Bélgica',
            'Inglaterra',
            'Panamá',
            'Tunísia',

            'Colômbia',
            'Japão',
            'Polônia',
            'Senegal'


            
        ],        
    }),
     methods: {
        searchSelecao: function(index) {
            const pais = this.paises[index].toLowerCase()
            this.$emit("clickSelecao", pais)
        }
    }
    
  
}
</script>
