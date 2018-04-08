import express from 'express';
import {Player} from '../modelos/models';

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