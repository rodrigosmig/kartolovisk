<template>
<div>
   <md-button class="md-raised md-accent" >
    <a id="menu" href="http://localhost:3000/" @click.prevent="logout()">SAIR</a></md-button>    
</div>
 </template>

<script>
import axios from 'axios'

export default {
    name:'sair',
     data: function() {
       return {
         
       }
    },
    methods:{
       logout: function() {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        this.$router.push({name: "Login"})
       }
    }
}
</script>

<style lang="scss" scoped>
  .md-app {
    max-height: 100%;
    border: 1px solid rgba(#000,.12);
  }
  .card-menu{
    width: 70%;
  }
  .campo {
    background-image: url("../assets/campo.jpg");
    width: 425px;
    height: 548px;
    margin-left: 15%;
    margin-top: 5%;
  }
   #menu{
    color:white;
  }
</style>

