<template>
    <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Posição</md-button>
        <md-menu-content>
            <md-menu-item @click="search(index)" v-for="(p, index) in positions" :key=index>{{ p }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>
<script>

export default {
    data: () => ({        
        positions: [
            'Goleiro', 
            'Zagueiro', 
            'Lateral',
            'Meio Campo',
            'Atacante'
        ],        
    }),
    methods: {
        search: function(index) {
            const position = this.positions[index].toLowerCase()
            this.$emit("clickPosition", position)
        }
    }
}
</script>

<style scoped>

</style>
