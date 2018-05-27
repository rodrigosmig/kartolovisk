<template>
    <div>  
        <f442 v-if="formation.formation === '4-4-2'" key="4-4-2"></f442>
        <f433 v-else-if="formation.formation === '4-3-3'" key="4-3-3"></f433>
        <modal></modal> 
        <confirmar></confirmar>       
    </div>

</template>
<script>
import { eventBus } from '../main.js';
import axios from 'axios'
import Modal from './Modal.vue';
import Confirmar from './Confirmar.vue';
import F433 from './Form-433.vue';
import F442 from './Form-442.vue';

export default {
    components: {
        Modal,
        Confirmar,
        F433,
        F442
    },
    created: function() {
        const team_id = "1"
        const url_team = "http://localhost:3000/teams/" + team_id
        axios.get(url_team).then(team => {
            this.team = team.data;
            const url_formation = "http://localhost:3000/formation/" + this.team.formationId
            axios.get(url_formation).then(formation => {
                this.formation = formation.data;   
            })      
        });
        eventBus.$on('clickScheme', scheme => {
            if(this.formation.formation !== scheme.formation) {
                this.formation_to_change = scheme
                eventBus.$emit("confirmFormation", true)                
            }
        })
        eventBus.$on('confirmation', confirmation => {
            if(confirmation) {
                this.formation = this.formation_to_change
                eventBus.$emit("changeScheme", this.formation_to_change)
            }
        })
    },
    data() {        
        return {
            team: {},
            formation: "",
            formation_to_change: ""
        }    
    },
    methods: {
        
    }
}
</script>

<style>



</style>
