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
                    <label>Time</label>
                    <md-input type="text" v-model="team.name" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Email</label>
                    <md-input type="text" v-model="user.email" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Senha</label>
                    <md-input type="password" v-model="user.password" autofocus @keyup.13="cadastro" ></md-input>
                </md-field>
            </div>

            <div class="actions md-alignment-center-space-between">
                <md-button class="md-raised md-accent" type="submit" @click.prevent="cadastro()" :disabled=false>Cadastrar</md-button>
                <p>{{message}}</p>
            </div>
        </md-content>

    </div> 
</template>

<script>

import axios from 'axios'
import { eventBus } from '../main.js';

export default {
    data: function(){
        return {
            user: {
                nickname: "",
                email: "",
                password: "",
                team: ""
            },
            message: "",

            team:{
                name:"",
                score: 0,
                user: "",
                formation: "",
            },
            showDialog: false,
        }
    },
    methods: {
        cadastro: async function() {
            this.cadastroUsuario();            
        },
        cadastroUsuario: async function(){
            this.user.team = this.team
            await axios.post("http://localhost:3000/users", this.user).then(response => {
                this.message= response.data.message
                this.user.nickname = ""
                this.user.email = ""
                this.user.password = ""
                this.team.name = ""
            }).catch(e =>{
                this.message = e.response.data.error
            });
            
               /*  this.team.user = user.data.user.id                
            }).then(() => {
                console.log(this.team.user)
                 axios.post("http://localhost:3000/teams", this.team).then(response => {
                    this.message= response.data.message;
                })
                this.message = "Usuário cadastrado com sucesso"
            })
            .catch(e =>{
                this.message = e.response.data.error
            }); */
                  
        },
        cadastroTime: function(){
            console.log(this.user.nickname)
            axios.get("http://localhost:3000/users/name/" + this.user.nickname).then(response =>{
                    this.team.user = response.data.id
                    console.log
                    
                    axios.post("http://localhost:3000/teams", this.team).then(response =>{
                        this.message= response.data.message;
                    })
                    .catch(e =>{
                        console.log("erro no time")
                            this.message = e.response.data.error
                    });
                })
                .catch(e =>{
                    console.log("erro no usuario")
                    this.message = e.response.data.error
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
