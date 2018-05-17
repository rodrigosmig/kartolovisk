<template>
    <div class="centered-container">
        <md-content class="md-elevation-3">
            <div class="title">
                <div class="md-title">Kartolovski</div>
                <div class="md-body-1">Tela de Cadastro</div>
            </div>

            <div class="form">
                <md-field>
                    <label>Login</label>
                    <md-input type="text" v-model="user.nickname" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Email</label>
                    <md-input type="text" v-model="user.email" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Senha</label>
                    <md-input type="password" v-model="user.password" autofocus></md-input>
                </md-field>
            </div>

            <div class="actions md-alignment-center-space-between">
                <md-button class="md-raised md-accent" type="submit" @click.prevent="cadastro()">Cadastrar</md-button>
                <p>{{message}}</p>
            </div>
        </md-content>
    </div> 
</template>

<script>

import axios from 'axios'

export default {

    data: function(){
        return {
            user: {
                nickname: "",
                email: "",
                password: ""
            },
            message: ""
        }
    },
    methods: {
        cadastro: function(){
            
            axios           
            .post("http://localhost:3000/users", this.user).then(response =>{
                this.message = "Usuário adicionado"
            })
            .catch(e =>{
                this.message = "Erro no cadastro do usuario"
            });
        }
    }

  
}
</script>

<style lang="scss" scoped>

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form {
    width: 300px;
}
.md-content {
    padding: 50px;
}
</style>
