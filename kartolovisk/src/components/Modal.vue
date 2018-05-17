/* <template>
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

<!--     <md-button class="md-primary md-raised" @click="showModal = true">Modal</md-button> -->
  </div>
</template>

<script>
  import { eventBus } from '../main.js';
  export default {
    name: 'modal',
    created() {
      eventBus.$on('show', function() {
        console.log(this.showModal)
        if(this.showModal) {
          console.log("true")
        }
        else {
          console.log("false")
        }
      })
    },
    data(){
      return {
        showModal: true,
      }      
    },
    methods: {
      remove() {
        this.$emit('remove')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>

 */

 <template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            This is the default tile!

            <!-- <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button> -->
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!

            <button type="button" class="btn-green" @click="remove" aria-label="Close modal">
              Remover
            </button>
            <button type="button" class="btn-green" @click="close" aria-label="Close modal">
              Fechar
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
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
  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>