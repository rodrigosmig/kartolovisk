import express from 'express';
import {Player} from '../modelos/models';
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
		const name= req.body.name;
		const country = req.body.country;
		const position = req.body.position;
		const score = req.body.score;
		const imagePlayer = req.file.path

		const data={ name: name, country: country, position: position, score: score, imagePlayer: imagePlayer}

		Player.create(data).then((players)=> {
			res.json({message:'cadastro com sucesso!'});
		})
		
	})

router.route('/players/name')

	.post((req,res)=>{
		const namePlayer = "%" + req.body.name + "%";
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

router.route('/players/country')
	
	.post((req, res)=>{
		const countryPlayer = "%" + req.body.country + "%";
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

router.route('/players/position')
	
	.post((req, res)=>{
		const positionPlayer = "%" + req.body.position + "%";
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

export default router;