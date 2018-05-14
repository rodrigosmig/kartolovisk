<template>
    <div>
        <input placeholder="Login" type="text" v-model="user.nickname">
        <input placeholder="E-mail" type="text" v-model="user.email">
        <input placeholder="Senha" type="password" v-model="user.password">

        <button type="submit" @click.prevent="cadastro()">Cadastrar</button>
        {{message}}
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
                this.message = "erro no cadastro do usuario"
            })
        }
    }

  
}
</script>

