<template>
    <div>      
        <div class=position :id="'goal_keeper_' + key" v-for="(player, key) in positions.goalKeeper" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'defender_' + key" v-for="(player, key) in positions.defenders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'side_backer_' + key" v-for="(player, key) in positions.sideBackers" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'midfielder_' + key" v-for="(player, key) in positions.midfielders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'forward_' + key" v-for="(player, key) in positions.forwards" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)">
            <label>{{player.name}}</label>
        </div>

        <modal @remove="removePlayer"></modal>
    </div>

</template>

<script>
import { eventBus } from '../main.js';
import axios from 'axios'

export default {
    created() {
        const player_id = "1"
        const url = "http://localhost:3000/teams/players/" + player_id + "/"
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
            });

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
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }            
                }
                else if(player.position === "Lateral") {
                    if(this.positions.sideBackers.length < 2) {
                        this.positions.sideBackers.push(player)
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                    
                }
                else if(player.position === "Meio Campo") {
                    if(this.positions.midfielders.length < 3) {
                    this.positions.midfielders.push(player)
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                    
                }
                else if(player.position === "Atacante") {
                    if(this.positions.forwards.length < 3) {
                        this.positions.forwards.push(player)
                    } 
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                }
                else {
                    if(this.positions.goalKeeper.length < 1) {
                        this.positions.goalKeeper.push(player)
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                }
                this.players.push(player)
            }
            else {
                let message = "Jogador já está no time."
                eventBus.$emit("message", message)
            }
                       
        });
        eventBus.$on('remove', player => {
            this.player = player;
            this.removePlayer();                   
        });
    },
    data() {        
        return {
            players: [],
            player: "",
            positions: {
                defenders: [],
                sideBackers: [],
                midfielders: [],
                forwards: [],
                goalKeeper: []
            },
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
        showModal(player) {
            this.player = player
            eventBus.$emit("show", this.player)
        },
        removePlayer() {
            const index = this.playerIndex(this.player.id)
            const indexPosition = this.playerIndexPosition(this.player.position)

            if(this.player.position === "Goleiro") {
                this.positions.goalKeeper.splice(indexPosition, 1)
            }
            else if(this.player.position === "Zagueiro") {
                this.positions.defenders.splice(indexPosition, 1)
            }
            else if(this.player.position === "Lateral") {
                this.positions.sideBackers.splice(indexPosition, 1)
            }
            else if(this.player.position === "Meio Campo") {
                this.positions.midfielders.splice(indexPosition, 1)
            }
            else if(this.player.position === "Atacante") {
                this.positions.forwards.splice(indexPosition, 1)
            }
            this.players.splice(index, 1)
            eventBus.$emit("close")
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
        margin: 260px 10px;
    }

    #midfielder_1 {
        margin: 260px 105px;
    }

    #midfielder_2 {
        margin: 260px 205px;
    }

    #midfielder_3 {
        margin: 260px 300px;
    }

    #forward_0 {
        margin: 400px 105px;
    }

    #forward_1 {
        margin: 400px 205px;
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