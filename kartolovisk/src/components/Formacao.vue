<template>
    <div>
        <div v-if="formation.formation === '4-4-2'">
            <f442 :team_players="players" key="4-4-2"></f442>
        </div>
        <div v-else-if="formation.formation === '4-3-3'">
            <f433 :team_players="players" key="4-3-3"></f433>
        </div>
        
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
    props: ['team', 'players', 'formation'],
    components: {
        Modal,
        Confirmar,
        F433,
        F442
    },
    created: function() {        
        eventBus.$on('clickScheme', scheme => {
            if(this.formation.formation !== scheme.formation) {
                this.formation_to_change = scheme
                eventBus.$emit("confirmFormation", true)                
            }
        })
        eventBus.$on('confirmation', confirmation => {
            if(confirmation) {
                eventBus.$emit("changeScheme", this.formation_to_change)
            }
        })
    },
    data: function() {        
        return {
            formation_to_change: "",
        }    
    },
    methods: {
        
    }
}
</script>

<style>



</style>
