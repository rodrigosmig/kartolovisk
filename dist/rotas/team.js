'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var Op = _sequelize2.default.Op;

router.route('/teams').get(function (req, res) {
	_models.Team.findAll().then(function (team) {
		res.send(team);
	});
}).post(function (req, res) {
	_models.Team.findOne({
		where: {
			userId: req.body.userId
		}
	}).then(function (team) {
		//Não permite usuário criar mais de um time
		if (!team) {
			var name = req.body.name;
			var formation = req.body.formation;
			var score = req.body.score;
			var userId = req.body.userId;
			var data = {
				name: req.body.name,
				formation: req.body.formation,
				score: req.body.score,
				userId: req.body.userId
			};

			_models.Team.create(data).then(function (team) {
				res.json({
					message: 'Time cadastrado com sucesso!!'
				});
			});
		} else {
			res.json({ error: 'Usuário já possui um time' });
		}
	});
});

router.route('/teams/:team_id').get(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			res.json(team);
		} else {
			res.json({ message: 'Time não cadastrado' });
		}
	});
}).delete(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			team.destroy().then(function (team) {
				res.json({ message: 'Time Deletado' });
			});
		} else {
			res.json({ error: 'Time não cadastrado' });
		}
	});
}).put(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			team.update({
				name: req.body.name,
				formation: req.body.formation,
				score: req.body.score,
				userId: req.body.userId
			}).then(function (team) {
				res.json(team);
			});
		} else {
			res.json({ error: 'Time não cadastrado' });
		}
	});
});

router.route('/teams/add_player').post(function (req, res) {
	//procurar o jogador
	_models.Player.findOne({
		where: {
			id: req.body.player
		}
	}).then(function (newPlayer) {
		//procura o time do usuário
		_models.Team.findOne({
			where: {
				userId: req.body.user
			}
		}).then(function (team) {
			//verifica se o jogador já está no time
			team.getPlayers({ newPlayer: newPlayer }).then(function (inTeam) {
				if (inTeam.length === 0) {
					//adiciona o jogador ao time
					newPlayer.addTeams(team).then(function (teste) {
						res.json({ message: 'Jogador adicionado ao time' });
					});
				} else {
					res.json({ error: 'Jogador já está no time' });
				}
			});
		});
	});
});

exports.default = router;