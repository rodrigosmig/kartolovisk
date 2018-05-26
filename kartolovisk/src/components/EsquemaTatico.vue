<template>
    <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Esquema Tático</md-button>
        <md-menu-content>
            <md-menu-item @click="searchScheme(index)" v-for="(p, index) in schemes" :key=index>{{ p }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>
<script>

export default {
    data: () => ({        
        schemes: [
            '4-4-2', 
            '4-3-3', 
            '3-5-2',
            '3-4-3',
            '5-4-1',
            '5-3-2'
        ],      
    }),
    methods: {
        searchScheme: function(index) {
            const scheme = this.schemes[index]
            this.$emit("clickScheme", scheme)
        }
    }
}
</script>

<style scoped>

</style>
