import express from 'express';
import {Player, Event, Tipo, Round} from '../modelos/models';
import Sequelize from 'sequelize';

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './imagens/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const upload = multer({ storage: storage });

let router = express.Router();
const Op = Sequelize.Op;

router.route('/players')

	.get((req, res)=>{
		Player.findAll().then(function(players){
			res.send(players);
		})
	})

	.post( upload.single('imagePlayer'), (req, res, next)=>{

		const name = req.body.name;
		const country = req.body.country;
		const position = req.body.position;
		const score = req.body.score;
		const imagePlayer = req.file.path

		const data={ name: name, country: country, position: position, score: score, imagePlayer: imagePlayer}

		Player.create(data).then((players)=> {
			res.json({message:'cadastro com sucesso!'});
		})
	})

router.route('/players/name/:player_name')

	.get((req,res)=>{
		const namePlayer = "%" + req.params.player_name + "%";
		Player.findAll({
			where: {
				name: {
					[Op.like]: namePlayer
				}
			}
		}).then(player =>{
			if(player.length !== 0){
				res.json(player)
			}else{
				res.json({message: "Nome não encontrado"});
			}
		})
	})

router.route('/players/country/:player_country')
	
	.get((req, res)=>{
		
		const countryPlayer = "%" + req.params.player_country + "%";
		console.log(countryPlayer)
		Player.findAll({
			where: {
				country: {
					[Op.like]: countryPlayer
				}
			}
		}).then(player =>{
			if(player.length !== 0){
				res.json(player)
			}else{
				res.json({message: "País não encontrado"});
			}
		})
	})

router.route('/players/position/:player_position')
	
	.get((req, res)=>{
		const positionPlayer = "%" + req.params.player_position + "%";
		Player.findAll({
			where: {
				position: {
					[Op.like]: positionPlayer
				}
			}
		}).then(player =>{
			if(player.length !== 0){
				res.json(player)
			}else{
				res.json({message: "Posição não encontrado"});
			}
		})
	})

router.route('/players/:player_id')

	.get((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player) {
				res.json(player);
			}else{
				res.json({message: 'Jogador não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player) {
				player.destroy().then((player)=>{
					res.json({message: 'Jogador Deletado'});
				})
			}else{
				res.json({error: 'Jogador não cadastrado'});
			}
		})
	})

	.put((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player){
				player.update({
					name: req.body.name, 
					country: req.body.country, 
					position: req.body.position, 
					score: req.body.score
				}).then((player)=>{
					res.json(player);
				})
			}else{
				res.json({error: 'Jogador não cadastrado'});
			}
		})
	})

router.route('/players/details/:round_id')
	
	.get((req, res)=>{
		Round.findOne({
			where: {
				id: req.params.round_id
			}
		}).then(round => {
			//verifica se a rodada informada é válida
			if(round) {
				let eventType = []
				Event.findAll({
					where: {
						playerId: req.body.player,
						[Op.and]: {
							roundId: req.params.round_id
						}
					}
				}).then(events => {
					//verifica se jogador possui eventos cadastrados
					if(events.length === 0) {
						res.json({
							message: "Jogador não possui nenhum evento."
						})
					}
					else {
						//cada evento da rodada e do jogador será adicionado em um array 
						for(let x = 0; x < events.length; x++) {
							Tipo.findOne({
								where: {
									id: events[x].tipoId
								}
							}).then(tipo => {
								let events = {
									nome: tipo.name, 
									score: tipo.score,
								}
								eventType.push(events)
							})			
						}					
						Player.findOne({
							where: {
								id: req.body.player
							}
						}).then(player => {
							//soma dos pontos
							let total = 0
							for(let k = 0; k < eventType.length; k++) {
								total += parseInt(eventType[k].score)
							}
							res.json({
								player: player.name,
								events: eventType,
								round: req.params.round_id,
								score: total
							})
						})
					}					
				})
			}
			else {
				res.json({
					message: "Rodada inválida."
				})
			}
		})	
	})

export default router;