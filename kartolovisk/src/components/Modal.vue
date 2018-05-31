<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>
        <slot name="header">{{ player.name }}</slot>
      </md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Características">
          <md-table>
            <md-table-row>
              <md-table-head>País</md-table-head>
              <md-table-head>Posição</md-table-head>
              <md-table-head>Pontuação Total</md-table-head>
            </md-table-row>

            <md-table-row>
              <md-table-cell>{{ player.country }}</md-table-cell>
              <md-table-cell>{{ player.position }}</md-table-cell>
              <md-table-cell>{{ player.score }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab md-label="Detalhes">
          <md-table>
            <md-table-row>
                <md-table-head>Rodada</md-table-head>
                <md-table-head>Evento</md-table-head>
                <md-table-head>Pontuação</md-table-head>
            </md-table-row>

            <md-table-row>
              <md-table-cell>01</md-table-cell>
              <md-table-cell>Cartão Vermelho</md-table-cell>
              <md-table-cell>-05</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button type="button" class="md-raised md-accent" @click="remove">
          Remover
        </md-button>
      </md-dialog-actions>
    </md-dialog>
    
  </div>
</template>

<script>
  import { eventBus } from '../main.js';

  export default {
    created() {
      eventBus.$on('show', player => {   
         this.showDialog = true
         this.player = player                    
      });
      eventBus.$on('close', player => {
        this.showDialog = false                  
      });
    },
    data() {
      return {
        showDialog: false,
        player: ""
      }
    },
    methods: {
      remove() {
          eventBus.$emit('remove', this.player)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>