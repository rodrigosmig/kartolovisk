'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/events').get(function (req, res) {
	_models.Event.findAll().then(function (event) {
		res.send(event);
	});
}).post(function (req, res) {
	var round = req.body.round;
	var playerId = req.body.playerId;
	var tipoId = req.body.tipoId;

	var data = {
		round: req.body.round,
		playerId: req.body.playerId,
		tipoId: req.body.tipoId
	};

	_models.Event.create(data).then(function (event) {
		res.json({
			message: 'Evento cadastrado com sucesso!!'
		});
	});
});

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

exports.default = router;