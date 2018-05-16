<template>
    <div>
        <!-- <div class="position" style="margin: 5px 175px;">1</div>
        <div class="position" style="margin: 110px 30px">2</div>
        <div class="position" style="margin: 110px 123px;">3</div>
        <div class="position" style="margin: 110px 223px">4</div>
        <div class="position" style="margin: 110px 310px">6</div>

        <div class="position" style="margin: 260px 30px">7</div>
        <div class="position" style="margin: 260px 123px">5</div>
        <div class="position" style="margin: 260px 223px">8</div>
        <div class="position" style="margin: 260px 310px">10</div>

        <div class="position" style="margin: 400px 123px;">11</div>
        <div class="position" style="margin: 400px 223px;">9</div> -->
       
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
import axios from 'axios'
import Modal from './Modal.vue';

export default {
    components: {
        Modal
    },
    created () {
        const url = "http://localhost:3000/players/"
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
            })
    },
    data() {        
        return {
            playerName: "",
            playerId: "",
            
            players: [],
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
                if(this.players[index].id == id) {
                    return index
                }
            }
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
            console.log(indexPosition)

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
