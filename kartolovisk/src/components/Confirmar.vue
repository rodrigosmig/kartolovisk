<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Tem certeza que deseja alterar a formação do time?"
      md-content="Ao alterar a formação todos os jogadores serão excluídos.<br>Será necessário inserí-los no time novamente."
      md-confirm-text="Alterar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    <!-- <md-button class="md-primary md-raised" @click="active = true">Confirm</md-button> -->
  </div>
</template>

<script>
    import { eventBus } from '../main.js';

    export default {
        created: function() {
            eventBus.$on('confirmFormation', confirm => {
                this.active = confirm
            })
        },
        data: () => ({
            active: false,
            value: null
        }),
        methods: {
            onConfirm () {
                this.value = true
                eventBus.$emit("confirmation", this.value)
            },
            onCancel () {
                this.value = false
                eventBus.$emit("confirmation", this.value)
            }
        }
    }
</script>