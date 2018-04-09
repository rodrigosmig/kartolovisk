import express from 'express';
import {User, Player, PlayerTeam, Team} from '../modelos/models';
import Sequelize from 'sequelize';

let router = express.Router();
const Op = Sequelize.Op;

router.route('/teams')

	.get((req, res)=>{
		Team.findAll().then(function(team) {
			res.send(team);
		})
	})

	.post((req, res)=>{
		Team.findOne({
			where: {
				userId: req.body.userId,
			}
		}).then(team => {
			//Não permite usuário criar mais de um time
			if(!team) {
				Team.findOne({
					where: {
						name: req.body.name
					}
				}).then(isExists => {
					//verifica se o nome do time já está sendo utilizado
					if(!isExists) {
						const name = req.body.name;
						const formation = req.body.formation;
						const score = req.body.score;
						const userId = req.body.userId;
						const data = {
							name: req.body.name, 
							formation: req.body.formation,
							score: req.body.score,
							userId: req.body.userId,
						};						
						Team.create(data).then((team)=> {
							res.json({
								message:'Time cadastrado com sucesso!!'
							});
						})
					}
					else {
						res.json({
							error: 'O nome do time já está sendo utilizado.'
						});
					}
				})				
			}
			else {
				res.json({
					error: 'Usuário já possui um time'
				});
			}
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
					res.json({message: 'Time Deletado'});
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

	.put((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				Team.findOne({
					where: {
						name: req.body.name
					}
				}).then(isExists => {
					//verifica se o nome do time é o mesmo do nome enviado
					if(team.name === req.body.name) {
						team.update({
							formation: req.body.formation,
							score: req.body.score,
						}).then((team) => {
							res.json(team);
						})
					}
					else {
						//verifica se o nome do time já está sendo utilizado
						if(!isExists) {
							team.update({
								name: req.body.name, 
								formation: req.body.formation,
								score: req.body.score,
							}).then((team) => {
								res.json(team);
							})
						}
						else {
							res.json({
								error: 'O nome do time já está sendo utilizado.'
							});
						}
					}
				})
			}
			else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

router.route('/teams/add_player')
	.post((req, res)=>{
		//procurar o jogador
		Player.findOne({
			where: {
				id: req.body.player
			}
		}).then(newPlayer => {
			//procura o time do usuário
			Team.findOne({
				where: {
					userId: req.body.user
				}
			}).then(team => {
				//verifica se o jogador já está no time
				team.getPlayers({newPlayer}).then(inTeam => {
					if(inTeam.length === 0) {
						//adiciona o jogador ao time
						newPlayer.addTeams(team).then(teste => {
							res.json({message: 'Jogador adicionado ao time'});
						})
					}
					else {
						res.json({error: 'Jogador já está no time'});
					}
				})
			})
		})		
	})	

export default router;