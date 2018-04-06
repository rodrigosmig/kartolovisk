import express from 'express';
import {Team} from '../modelos/models';

let router = express.Router();

router.route('/teams')

	.get((req, res)=>{
		Team.findAll().then(function(team) {
			res.send(team);
		})
	})

	.post((req, res)=>{
		const name = req.body.name;
		const formation = req.body.formation;
		const data = {name: req.body.name, formation: req.body.formation};
		
		Team.create(data).then((team)=> {
			res.json({
				message:'Time cadastrado com sucesso!!'
			});
		})
	})

router.route('/teams/:team_id')

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
	})

export default router;