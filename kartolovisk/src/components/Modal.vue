<template>

    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">

        <md-title class="modal-header">
          <slot name="header">
          </slot>
        </md-title>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <md-button type="button" class="md-raised md-accent" @click="remove" aria-label="Close modal">
              Remover
            </md-button>
            <md-button type="button" class="md-raised md-primary" @click="close" aria-label="Close modal">
              Fechar
            </md-button>
          </slot>
        </footer>

      </div>
    </div>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
        close() {
            this.$emit('close');
        },
        remove() {
            this.$emit('remove')
        }
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: 180px;
    display: flex;
    
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: black;
    justify-content: space-between;
  }
</style>
