<template>
    <div>      
        <div class=position :id="'goal_keeper_' + key" v-for="(player, key) in positions.goalKeeper" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)" v-if="player.name !== 'nenhum'">
            <img src="../assets/camisa2.png" v-else>
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'defender_' + key" v-for="(player, key) in positions.defenders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)" v-if="player.name !== 'nenhum'">
            <img src="../assets/camisa2.png" v-else>
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'side_backer_' + key" v-for="(player, key) in positions.sideBackers" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)" v-if="player.name !== 'nenhum'">
            <img src="../assets/camisa2.png" v-else>
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'midfielder_' + key" v-for="(player, key) in positions.midfielders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)" v-if="player.name !== 'nenhum'">
            <img src="../assets/camisa2.png" v-else>
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'forward_' + key" v-for="(player, key) in positions.forwards" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player)" v-if="player.name !== 'nenhum'">
            <img src="../assets/camisa2.png" v-else>
            <label>{{player.name}}</label>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../main.js';
import axios from 'axios'

export default {
    props: ['team_players'],
    created() {
        const user_id = localStorage.getItem("id")

        //busca os jogadores do time do usuario
        const url_team_players = "http://localhost:3000/teams/players/" + user_id
        axios.get(url_team_players).then(response => {
            if(response.data.length === 0) {
                this.team_players = []
            }
            else {
                this.team_players = response.data
            }

            if(this.team_players.length === 0) {
                //preencher quando o time não tiver nenum jogador
                for(let z = 0; z < 2; z++) {
                    this.positions.defenders.push(
                        {
                            "id": "nenhum" ,
                            "name": "nenhum",
                            "position": "Zagueiro"
                        }
                    )
                }
                for(let s = 0; s < 2; s++) {
                    this.positions.sideBackers.push(
                        {
                            "id": "nenhum",
                            "name": "nenhum",
                            "position": "Zagueiro"
                        }
                    )
                }
                for(let m = 0; m < 4; m++) {
                    this.positions.midfielders.push(
                        {
                            "id": "nenhum",
                            "name": "nenhum",
                            "position": "Zagueiro"
                        }
                    )
                }
                for(let f = 0; f < 2; f++) {
                    this.positions.forwards.push(
                        {
                            "id": "nenhum",
                            "name": "nenhum",
                            "position": "Zagueiro"
                        }
                    )
                }
                this.positions.goalKeeper.push(
                    {
                        "id": "nenhum",
                        "name": "nenhum",
                        "position": "Zagueiro"
                    }
                )
            }
            else {
                for(let player of this.team_players) {
                    if(player.position === "Zagueiro") {
                        this.positions.defenders.push(player)
                        this.total_defenders++
                    }
                    else if(player.position === "Lateral") {
                        this.positions.sideBackers.push(player)
                        this.total_sideBackers++
                    }
                    else if(player.position === "Meio Campo") {
                        this.positions.midfielders.push(player)
                        this.total_midfielders++
                    }
                    else if(player.position === "Atacante") {
                        this.positions.forwards.push(player)
                        this.total_forwards++
                    }
                    else {
                        this.positions.goalKeeper.push(player)
                        this.total_goalKeeper++
                    }
                }
            }

        })
        
        eventBus.$on('adicionaJogador', player => {
            const index = this.searchEmptyIndex(player.position)
            if(this.playerIndex(player.id) < 0) {
                if(player.position === "Zagueiro") {
                    if(this.total_defenders < 2) {
                        this.positions.defenders.splice(index, 1, player)
                        this.total_defenders++
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }            
                }
                else if(player.position === "Lateral") {
                    if(this.total_sideBackers < 2) {
                        this.positions.sideBackers.splice(index, 1, player)
                        this.total_sideBackers++
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                    
                }
                else if(player.position === "Meio Campo") {
                    if(this.total_midfielders < 3) {
                        this.positions.midfielders.splice(index, 1, player)
                        this.total_midfielders++
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                    
                }
                else if(player.position === "Atacante") {
                    if(this.total_forwards < 3) {
                        this.positions.forwards.splice(index, 1, player)
                        this.total_forwards++
                    } 
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                }
                else {
                    if(this.total_goalKeeper < 1) {
                        this.positions.goalKeeper.splice(index, 1, player)
                        this.total_goalKeeper++
                    }
                    else {
                        let message = "Não existe posição disponível."
                        eventBus.$emit("message", message)
                        return
                    }
                }
                this.team_players.push(player)
                eventBus.$emit("add_player", player)
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
            player: "",
            positions: {
                defenders: [],
                sideBackers: [],
                midfielders: [],
                forwards: [],
                goalKeeper: []
            },
            total_goalKeeper: 0,
            total_defenders: 0,
            total_sideBackers: 0,
            total_midfielders: 0,
            total_forwards: 0,
        }    
    },
    methods: {
        searchEmptyIndex(position) {
            if(position === "Goleiro") {
                for(let index in this.positions.goalKeeper) {
                    if(this.positions.goalKeeper[index].id === "nenhum") {
                        return index
                    }
                }
            }    
            else if(position === "Zagueiro") {
                for(let index in this.positions.defenders) {
                    if(this.positions.defenders[index].id === "nenhum") {
                        return index
                    }
                }
            }
            else if(position === "Lateral") {
                for(let index in this.positions.sideBackers) {
                    if(this.positions.sideBackers[index].id === "nenhum") {
                        return index
                    }
                }
            }
            else if(position === "Meio Campo") {
                for(let index in this.positions.midfielders) {
                    if(this.positions.midfielders[index].id === "nenhum") {
                        return index
                    }
                }
            }
            else if(position === "Atacante") {
                for(let index in this.positions.forwards) {
                    if(this.positions.forwards[index].id === "nenhum") {
                        return index
                    }
                }
            }
        },
        playerIndex(id) {
            for(let index in this.team_players) {
                if(this.team_players[index].id === id) {
                    return index
                }
            }
            return -1
        },
        playerIndexPosition(position) {
            if(position === "Goleiro") {
                for(let index in this.positions.goalKeeper) {
                    if(this.positions.goalKeeper[index].id === this.player.id) {
                        return index
                    }
                }
            }    
            else if(position === "Zagueiro") {
                for(let index in this.positions.defenders) {
                    if(this.positions.defenders[index].id === this.player.id) {
                        return index
                    }
                }
            }
            else if(position === "Lateral") {
                for(let index in this.positions.sideBackers) {
                    if(this.positions.sideBackers[index].id === this.player.id) {
                        return index
                    }
                }
            }
            else if(position === "Meio Campo") {
                for(let index in this.positions.midfielders) {
                    if(this.positions.midfielders[index].id === this.player.id) {
                        return index
                    }
                }
            }
            else if(position === "Atacante") {
                for(let index in this.positions.forwards) {
                    if(this.positions.forwards[index].id === this.player.id) {
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
                this.positions.goalKeeper.splice(indexPosition, 1, {"id": "nenhum", "name": "nenhum","position": "Goleiro"})
                this.total_goalKeeper--
            }
            else if(this.player.position === "Zagueiro") {
                this.positions.defenders.splice(indexPosition, 1, {"id": "nenhum", "name": "nenhum","position": "Zagueiro"})
                this.total_defenders--
            }
            else if(this.player.position === "Lateral") {
                this.positions.sideBackers.splice(indexPosition, 1, {"id": "nenhum", "name": "nenhum","position": "Lateral"})
                this.total_sideBackers--
            }
            else if(this.player.position === "Meio Campo") {
                this.positions.midfielders.splice(indexPosition, 1, {"id": "nenhum", "name": "nenhum","position": "Meio Campo"})
                this.total_midfielders--
            }
            else if(this.player.position === "Atacante") {
                this.positions.forwards.splice(indexPosition, 1, {"id": "nenhum", "name": "nenhum","position": "Goleiro"})
                this.total_forwards--
            }
            this.team_players.splice(index, 1)
            eventBus.$emit("remove_player", this.player)
            eventBus.$emit("close")
        }
    }
}
</script>

<style scoped>
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