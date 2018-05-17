<template>
  <div>
    <md-dialog :md-active.sync="showModal">
      <md-dialog-title>
        <slot name="header"></slot>
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
              <md-table-cell>Brasil</md-table-cell>
              <md-table-cell>Atacante</md-table-cell>
              <md-table-cell>100</md-table-cell>
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

    <md-button class="md-primary md-raised" @click="showModal = true">Modal</md-button>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    data: () => ({
      showModal: false
    }),
    methods: {
      remove() {
        this.$emit('remove')
      }
    },
  };
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>

