<template>
    <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Esquema Tático</md-button>
        <md-menu-content>
            <md-menu-item @click="searchScheme(index)" v-for="(p, index) in schemes" :key=index>{{ p.formation }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>
<script>
    import { eventBus } from '../main.js';
    import axios from 'axios'
    
    export default {
        created: function() {
            const url = "http://localhost:3000/formation/"
            axios.get(url).then(formation => {
                for(let f of formation.data) {
                    this.schemes.push(f)
                }
                
            })
        },
        data() {        
            return {
                schemes: [], 
            }     
        },
        methods: {
            searchScheme: function(index) {
                const scheme = this.schemes[index]
                eventBus.$emit("clickScheme", scheme)
            }
        }
    }
    </script>

<style scoped>

</style>
