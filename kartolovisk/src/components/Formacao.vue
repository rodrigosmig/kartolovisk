<template>
    <div>      
        <f442></f442>
        <modal></modal>
    </div>

</template>
<script>
import { eventBus } from '../main.js';
import axios from 'axios'
import Modal from './Modal.vue';
import F433 from './Form-433.vue';
import F442 from './Form-442.vue';

export default {
    components: {
        Modal,
        F433,
        F442
    },
    data() {        
        return {

        }    
    },
    methods: {
        
    }
}
</script>

<style>



</style>
