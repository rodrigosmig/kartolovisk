<template>
    <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Posição</md-button>
        <md-menu-content>
            <md-menu-item @click="search(index)" v-for="(p, index) in positions" :key=index>{{ p }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            positions: [
                'Goleiro', 
                'Zagueiro', 
                'Lateral',
                'Meio Campo',
                'Atacante'
            ],
        }
    },
    methods: {
        search: function(index) {
            const position = this.positions[index].toLowerCase()
            axios.get("http://localhost:3000/players")
                .then(players => {
                    console.log(players)
                })
                .catch(error => {
                    console.log("Erro")
                })
        }
    }
}
</script>

<style scoped>

</style>
