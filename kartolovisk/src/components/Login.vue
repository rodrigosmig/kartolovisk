<template>

    <div>
        <input placeholder="Login" type="text" v-model="user.nickname">
        <input placeholder="Senha" type="password" v-model="user.password">

        <button type="submit" @click.prevent="login()"> Entrar </button>
            {{message}}

        <p>Ainda não é cadastrado? Clique </p> <router-link to='/cadastro'>aqui</router-link>
    </div>
  
</template>

<script>

import axios from 'axios'

export default {

    data: function(){
        return {
            user:{
                nickname: "",
                password: ""
            },
            message: ""
        }
    },
    methods: {
        login: function(){
            axios
            .post("http://localhost:3000/auth" , this.user).then(response =>{
                localStorage.setItem("token", response.data.token)
                this.message = response.data.message
            })
            .catch (e =>{
                this.message = "nickname ou senha inválido"
            })
        }
    }
}
</script>

