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
        paises:['Alemanha', 'Argentina', 'Arábia Saudita','Uruguai', 'Austrália', 'Brazil', 'Bélgica', 
            'Colômbia', 'Coreia do Sul', 'Costa Rica', 'Croácia', 'Dinamarca', 
            'Egito', 'Espanha', 'França', 'Inglaterra', 'Irã', 'Islândia', 
            'Japão', 'Marrocos', 'México', 'Nigéria', 'Panamá', 
            'Peru', 'Polônia', 'Portugal', 'Rússia', 'Senegal', 'Suécia', 
            'Suíça', 'Sérvia', 'Tunísia'
            
        ]        
    }),
     methods: {
        searchSelecao: function(index) {
            const pais = this.paises[index].toLowerCase()
            this.$emit("clickSelecao", pais)
        }
    }
    
  
}
</script>
