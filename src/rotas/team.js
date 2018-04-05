import express from 'express';
import {Player, Team} from '../modelos/models';

let router = express.Router();

router.route('/teams')

	.get((req, res)=>{
		Team.findAll().then(function(team){
			res.send(team);
		})
	})

	.post((req, res)=>{
		const name = req.body.name;
		const formation = req.body.formation;

        const dataPlayer = {name: req.body.name, formation: req.body.formation};
	})

router.route('/teams/:team_id')

	.get((req, res)=>{
		Team.findById(req.params.team_id).then(team =>{
			if(team) {
				res.json(team);
			}else{
				res.json({message: 'Time não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Team.findById(req.params.team_id).then(team =>{
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
		Team.findById(req.params.team_id).then(team =>{
			if(team){
				team.update({name: req.body.name, formation: req.body.formation}).then((team)=>{
					res.json(team);
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

export default router;