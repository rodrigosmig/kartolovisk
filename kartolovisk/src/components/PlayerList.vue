<template>
    <div>
        <md-table-row v-for="player in players" :key="player.id">
            <md-table-cell>IMG</md-table-cell>
            <md-table-cell>player.name</md-table-cell>
            <md-table-cell>player.country</md-table-cell>
            <md-table-cell>player.position</md-table-cell>
            <md-table-cell md-numeric>player.core</md-table-cell>
            <md-table-cell>DT</md-table-cell>
        </md-table-row>
    </div>
</template>
<script>

export default {
    props: ['players'],
    data: () => ({
        
    }),
}
</script>

<style scoped>

</style>
