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
       
        <div class=position :id="'goal_keeper_' + key" v-for="(player, key) in goalKeeper" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'defender_' + key" v-for="(player, key) in defenders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'side_backer_' + key" v-for="(player, key) in sideBackers" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'midfielder_' + key" v-for="(player, key) in midfielders" :key="player.id">
            <img src="../assets/camisa.png" @click="showModal(player.id)">
            <label>{{player.name}}</label>
        </div>

        <div class=position :id="'forward_' + key" v-for="(player, key) in forwards" :key="player.id">
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
                        this.defenders.push(player)
                    }
                    else if(player.position === "Lateral") {
                        this.sideBackers.push(player)
                    }
                    else if(player.position === "Meio Campo") {
                        this.midfielders.push(player)
                    }
                    else if(player.position === "Atacante") {
                        this.forwards.push(player)
                    }
                    else {
                        this.goalKeeper.push(player)
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
            isModalVisible: false,
            players: [],
            defenders: [],
            sideBackers: [],
            midfielders: [],
            forwards: [],
            goalKeeper: []
            
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

    #forward_0 {
        margin: 400px 300px;
    }

    #forward_1 {
        margin: 400px 10px;
    }

    #forward_2 {
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
