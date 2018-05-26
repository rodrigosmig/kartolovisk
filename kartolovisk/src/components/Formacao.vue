<template>
    <div>      
        <f433></f433>
        <modal></modal>
    </div>

</template>
<script>
import { eventBus } from '../main.js';
import axios from 'axios'
import Modal from './Modal.vue';
import F433 from './Form-433.vue';

export default {
    components: {
        Modal,
        F433
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
