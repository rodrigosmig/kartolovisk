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
       
        <div class=position :id="'player_' + key" v-for="(player, key) in players" :key="key">
            <img src="../assets/camisa.png" @click="showModal(player.name)">
            <label>{{player.name}}</label>
        </div>

        <modal v-show="isModalVisible" @close="closeModal" @remove="removePlayer()">
            <span slot="header">
                {{ playerName }}
            </span>
        </modal>
    </div>

</template>
<script>
import Modal from './Modal.vue';

export default {
    components: {
        Modal
    },
    created () {
        
    },
    data() {        
        return {
            playerName: "",
            isModalVisible: false,
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
                    "name": "C. Ronaldo",
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
            ]
        }    
    },
    methods: {
        showModal(player) {
            this.playerName = player
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        removePlayer(id) {
            console.log("Jogador removido")
            console.log(id)
            this.isModalVisible = false;
        }
    }
}
</script>

<style>

    #player_0 {
        margin: 5px 151px;
    }
    
    #player_1 {
        margin: 110px 10px;
    }

    #player_2 {
        margin: 110px 105px;
    }
    #player_3 {
        margin: 110px 205px;
    }

    #player_4 {
        margin: 110px 300px;
    }

    #player_5 {
        margin: 260px 10px;
    }

    #player_6 {
        margin: 260px 105px;
    }

    #player_7 {
        margin: 260px 205px;
    }

    #player_8 {
        margin: 260px 300px;
    }

    #player_9 {
        margin: 400px 105px;
    }

    #player_10 {
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
