import express from 'express';
import {Event} from '../modelos/models';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.route('/events')

	.get((req, res)=>{
		Event.findAll().then(function(event) {
			res.send(event);
		})
	})

	.post((req, res)=>{
		const round = req.body.round;
		const playerId = req.body.playerId;
		const tipoId = req.body.tipoId;
		
		const data = {
			round: req.body.round, 
			playerId: req.body.playerId,
			tipoId: req.body.tipoId,
		};
		
		Event.create(data).then((event)=> {
			res.json({
				message:'Evento cadastrado com sucesso!!'
			});
		})
	})

/* router.route('/teams/:team_id')

	.get((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				res.json(team);
			}else{
				res.json({message: 'Time não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				team.destroy().then((team)=>{
					res.json({message: 'Jogador Deletado'});
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

	.put((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team){
				team.update({
					name: req.body.name, 
					formation: req.body.formation
				}).then((team) => {
					res.json(team);
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	}) */

export default router;