<template>
    <div>      
        <div class=position :id="'goal_keeper_' + key" v-for="(player, key) in positions.goalKeeper" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'defender_' + key" v-for="(player, key) in positions.defenders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'side_backer_' + key" v-for="(player, key) in positions.sideBackers" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'midfielder_' + key" v-for="(player, key) in positions.midfielders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'forward_' + key" v-for="(player, key) in positions.forwards" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <modal v-show="isModalVisible" @close="closeModal" @remove="removePlayer">
            <span slot="header">
                {{ playerName }}
            </span>
        </modal>
    </div>

</template>
<script>
import { eventBus } from '../main.js';
import axios from 'axios'
import Modal from './Modal.vue';

export default {
    components: {
        Modal
    },
    created () {
        /* const url = "http://localhost:3000/players/"
        axios.get(url)
            .then(response => {                
                this.players = response.data
                for(let player of this.players) {
                    if(player.position === "Zagueiro") {
                        this.positions.defenders.push(player)
                    }
                    else if(player.position === "Lateral") {
                        this.positions.sideBackers.push(player)
                    }
                    else if(player.position === "Meio Campo") {
                        this.positions.midfielders.push(player)
                    }
                    else if(player.position === "Atacante") {
                        this.positions.forwards.push(player)
                    }
                    else {
                        this.positions.goalKeeper.push(player)
                    }
                }
            })
            .catch(error => {
                console.log("Erro")
            }); */

            for(let player of this.players) {
                    if(player.position === "Zagueiro") {
                        this.positions.defenders.push(player)
                    }
                    else if(player.position === "Lateral") {
                        this.positions.sideBackers.push(player)
                    }
                    else if(player.position === "Meio Campo") {
                        this.positions.midfielders.push(player)
                    }
                    else if(player.position === "Atacante") {
                        this.positions.forwards.push(player)
                    }
                    else {
                        this.positions.goalKeeper.push(player)
                    }
                }
        eventBus.$on('adicionaJogador', player => {
            
            if(this.playerIndex(player.id) < 0) {
                if(player.position === "Zagueiro") {
                    if(this.positions.defenders.length < 2) {
                        this.positions.defenders.push(player)
                    }              
                }
                else if(player.position === "Lateral") {
                    if(this.positions.sideBackers.length < 2) {
                        this.positions.sideBackers.push(player)
                    } 
                    
                }
                else if(player.position === "Meio Campo") {
                    if(this.positions.midfielders.length < 3) {
                    this.positions.midfielders.push(player)
                    }
                    else {
                        console.log("não cabe")
                    }
                    
                }
                else if(player.position === "Atacante") {
                    if(this.positions.forwards.length < 3) {
                        this.positions.forwards.push(player)
                    } 
                }
                else {
                    if(this.positions.goalKeeper.length < 1) {
                        this.positions.goalKeeper.push(player)
                    } 
                }
                this.players.push(player) 
            }
            else {
                let message = "Jogador já está no time."
                this.$emit("message", message)
            }
                       
        });
    },
    data() {        
        return {
            playerName: "",
            playerId: "",
            
            players: [
                {
                    "id": 1,
                    "name": "Salah",
                    "country": "Egito",
                    "position": "Atacante",
                    "score": -5,
                    "imagePlayer": "imagens/2018-04-21T18:01:28.810Zsalah.jpeg",
                    "createdAt": "2018-04-21T18:01:28.818Z",
                    "updatedAt": "2018-04-24T01:06:51.341Z"
                },
                {
                    "id": 2,
                    "name": "Sadio Mané",
                    "country": "Senegal",
                    "position": "Atacante",
                    "score": 0,
                    "imagePlayer": "imagens/2018-04-21T18:02:15.569Zmane.png",
                    "createdAt": "2018-04-21T18:02:15.589Z",
                    "updatedAt": "2018-04-21T18:02:15.589Z"
                },
                {
                    "id": 3,
                    "name": "James Milner",
                    "country": "Inglaterra",
                    "position": "Meio Campo",
                    "score": 0,
                    "imagePlayer": "imagens/2018-04-21T18:18:32.535Zmilner.jpeg",
                    "createdAt": "2018-04-21T18:18:32.544Z",
                    "updatedAt": "2018-04-21T18:18:32.544Z"
                },
                {
                    "id": 4,
                    "name": "Alisson",
                    "country": "Brazil",
                    "position": "Goleiro",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:18:09.808Z2018-04-16T20:03:32.152Zalisson.jpg",
                    "createdAt": "2018-05-14T01:18:09.847Z",
                    "updatedAt": "2018-05-14T01:18:09.847Z"
                },
                {
                    "id": 5,
                    "name": "Thiago Silva",
                    "country": "Brazil",
                    "position": "Zagueiro",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:19:40.468Z2018-04-16T20:04:35.475Zthiago_silva.jpg",
                    "createdAt": "2018-05-14T01:19:40.472Z",
                    "updatedAt": "2018-05-14T01:19:40.472Z"
                },
                {
                    "id": 6,
                    "name": "Coutinho",
                    "country": "Brazil",
                    "position": "Meio Campo",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:20:42.290Z2018-04-16T20:05:01.014Zcoutinho.jpeg",
                    "createdAt": "2018-05-14T01:20:42.293Z",
                    "updatedAt": "2018-05-14T01:20:42.293Z"
                },
                {
                    "id": 7,
                    "name": "Daniel Alves",
                    "country": "Brazil",
                    "position": "Lateral",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:21:35.049Z2018-04-16T20:04:11.115Zdaniel_alves.jpg",
                    "createdAt": "2018-05-14T01:21:35.050Z",
                    "updatedAt": "2018-05-14T01:21:35.050Z"
                },
                {
                    "id": 8,
                    "name": "Van Dijk",
                    "country": "Holanda",
                    "position": "Zagueiro",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:24:36.624ZVirgil-van-Dijik.png",
                    "createdAt": "2018-05-14T01:24:36.631Z",
                    "updatedAt": "2018-05-14T01:24:36.631Z"
                },
                {
                    "id": 9,
                    "name": "Messi",
                    "country": "Argentina",
                    "position": "Meio Campo",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:25:20.963Z2018-04-16T20:06:23.323Zmessi.jpeg",
                    "createdAt": "2018-05-14T01:25:20.965Z",
                    "updatedAt": "2018-05-14T01:25:20.965Z"
                },
                {
                    "id": 10,
                    "name": "Cristiano Ronaldo",
                    "country": "Portugal",
                    "position": "Atacante",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:26:15.729Z2018-04-16T20:07:37.206Zcristiano_ronaldo.jpg",
                    "createdAt": "2018-05-14T01:26:15.739Z",
                    "updatedAt": "2018-05-14T01:26:15.739Z"
                },
                {
                    "id": 11,
                    "name": "Rafinha",
                    "country": "Brasil",
                    "position": "Lateral",
                    "score": 0,
                    "imagePlayer": "imagens/2018-05-14T01:28:20.055Zrafinha.jpg",
                    "createdAt": "2018-05-14T01:28:20.076Z",
                    "updatedAt": "2018-05-14T01:28:20.076Z"
                }
            ],
            positions: {
                defenders: [],
                sideBackers: [],
                midfielders: [],
                forwards: [],
                goalKeeper: []
            },
            isModalVisible: false,
        }    
    },
    methods: {
        playerIndex(id) {
            for(let index in this.players) {
                if(this.players[index].id === id) {
                    return index
                }
            }
            return -1
        },
        playerIndexPosition(position) {
            if(position === "Goleiro") {
                for(let index in this.positions.goalKeeper) {
                    if(this.positions.goalKeeper[index].id === this.playerId) {
                        return index
                    }
                }
            }    
            else if(position === "Zagueiro") {
                for(let index in this.positions.defenders) {
                    if(this.positions.defenders[index].id === this.playerId) {
                        return index
                    }
                }
            }
            else if(position === "Lateral") {
                for(let index in this.positions.sideBackers) {
                    if(this.positions.sideBackers[index].id === this.playerId) {
                        return index
                    }
                }
            }
            else if(position === "Meio Campo") {
                for(let index in this.positions.midfielders) {
                    if(this.positions.midfielders[index].id === this.playerId) {
                        return index
                    }
                }
            }
            else if(position === "Atacante") {
                for(let index in this.positions.forwards) {
                    if(this.positions.forwards[index].id === this.playerId) {
                        return index
                    }
                }
            }
        },
        showModal(id) {
            this.playerId = id            
            const index = this.playerIndex(id)
            this.playerName = this.players[index].name
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        removePlayer() {
            const index = this.playerIndex(this.playerId)
            const position = this.players[index].position
            const indexPosition = this.playerIndexPosition(position)

            if(position === "Goleiro") {
                this.positions.goalKeeper.splice(indexPosition, 1)
            }
            else if(position === "Zagueiro") {
                this.positions.defenders.splice(indexPosition, 1)
            }
            else if(position === "Lateral") {
                this.positions.sideBackers.splice(indexPosition, 1)
            }
            else if(position === "Meio Campo") {
                this.positions.midfielders.splice(indexPosition, 1)
            }
            else if(position === "Atacante") {
                this.positions.forwards.splice(indexPosition, 1)
            }
            this.players.splice(index, 1)
            this.isModalVisible = false;
        }
    }
}
</script>

<style>

    #goal_keeper_0 {
        margin: 5px 153px;
    }
    
    #defender_0 {
        margin: 110px 105px;
    }
    #defender_1 {
        margin: 110px 205px;
    }

     #side_backer_0 {
        margin: 110px 10px;
    }

    #side_backer_1 {
        margin: 110px 300px;
    }

    #midfielder_0 {
        margin: 260px 50px;
    }

    #midfielder_1 {
        margin: 260px 153px;
    }

    #midfielder_2 {
        margin: 260px 260px;
    }

    #forward_2 {
        margin: 400px 300px;
    }

    #forward_0 {
        margin: 400px 10px;
    }

    #forward_1 {
        margin: 400px 153px;
    }

    .position {
        position: absolute;
        width: 85px;
        height: 45px;
        border-radius: 20px;
        font-size: 18px;
        line-height: 0px;
        transition: .3s linear all;
    }
    .position:hover {
        transform: scale(1.4)
    }
    label {
        font-size: 11px;
        white-space: pre;
        text-align: center;
        font-weight: bolder;        
    }

</style>
