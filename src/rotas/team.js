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
				userId: req.body.user,
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
						const data = {
							name: req.body.name, 
							formationId: req.body.formation,
							score: 0,
							userId: req.body.user,
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

router.route('/teams/:user_id')

	.get((req, res)=>{
		Team.findOne({
			where: {
				userId: req.params.user_id,
			}
		}).then(team => {
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
					res.json({
						message: 'Time Deletado'
					});
				})
			}else{
				res.json({
					error: 'Time não cadastrado'
				});
			}
		})
	})
	//altera apenas a formação do time
	.put((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				team.update({
					formationId: req.body.formation,
				}).then((team) => {
					res.json(team);
				})
			}
			else{
				res.json({
					error: 'Time não cadastrado'
				});
			}
		})
	})

router.route('/teams/players/:user_id')

	.get((req, res)=>{
		Team.findOne({
			where: {
				userId: req.params.user_id
			}
		}).then(team => {
			if(team) {
				team.getPlayers().then(players => {
					if(players.length === 0) {
						res.json()
					}
					else {
						res.json(players)
					}				
				})
			}
			else {
				res.json({
					error: "Usuário não possui time cadastrado."
				})
			}
		})
	})

	.post((req, res)=>{
		//procurar o jogador
		Player.findOne({
			where: {
				id: req.body.player
			}
		}).then(player => {
			if(player) {
				//procura o time do usuário
				Team.findOne({
					where: {
						userId: req.body.user
					}
				}).then(team => {
					if(team) {
						//verifica se o jogador já está no time
						team.hasPlayers(player).then(hasPlayer => {
							if(!hasPlayer) {
								//adiciona o jogador ao time
								player.addTeams(team).then(ret => {
									res.json({message: 'Jogador adicionado ao time'});
								})
							}
							else {
								res.json({error: 'Jogador já está no time'});
							}
						})
					}
					else {
						res.json({
							error: "Usuário não possui time cadastrado."
						})
					}
					
				})
			}
			else {
				res.json({
					error: "Jogador não encontrado."
				})
			}
		})		
	})

	.delete((req, res)=>{
		//procurar o jogador
		Player.findOne({
			where: {
				id: req.body.player
			}
		}).then(player => {
			if(player) {
				//procura o time do usuário
				Team.findOne({
					where: {
						userId: req.body.user
					}
				}).then(team => {
					if(team) {
						//verifica se o jogador já está no time
						team.hasPlayers(player).then(hasPlayer => {
							if(hasPlayer) {
								//remove o jogador ao time
								team.removePlayers(player).then(ret => {
									res.json({message: 'Jogador removido do time'});
								})
							}
							else {
								res.json({error: 'Jogador não está no time'});
							}
						})
					}
					else {
						res.json({
							message: "Usuário não possui time cadastrado."
						})
					}
				})
			}
			else {
				res.json({
					error: "Jogador não encontrado."
				})
			}			
		})		
	})

router.route('/teams/score/update')

	.get((req, res)=>{
		Team.findAll().then(teams => {
			for(let x = 0; x < teams.length; x++) {
				let totalScore = 0
				teams[x].getPlayers().then(players => {
					for(let y = 0; y < players.length; y++) {
						totalScore += players[y].score
					}
					totalScore += teams[x].score
					teams[x].update({
						score: totalScore
					})
				})
			}
			Player.findAll().then(player => {
				for(let k = 0; k < player.length; k++) {
					player[k].update({
						score: 0
					})
				}
				res.json({
					message: "Rodada finalizada com sucesso."
				})
			})
		})
	})

export default router;