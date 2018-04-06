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

router.route('/players').get(function (req, res) {
	_models.Player.findAll().then(function (players) {
		res.send(players);
	});
}).post(function (req, res) {

	var name = req.body.name;
	var country = req.body.country;
	var position = req.body.position;
	//const picture = req.body.picture;
	var score = req.body.score;

	var data = { name: name, country: country, position: position, score: score };

	_models.Player.create(data).then(function (players) {
		res.json({ message: 'cadastro com sucesso!!' });
	});
});

router.route('/players/:player_id').get(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			res.json(player);
		} else {
			res.json({ message: 'Jogador não cadastrado' });
		}
	});
}).delete(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			player.destroy().then(function (player) {
				res.json({ message: 'Jogador Deletado' });
			});
		} else {
			res.json({ error: 'Jogador não cadastrado' });
		}
	});
}).put(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			player.update({ name: req.body.name, country: req.body.country, position: req.body.position, picture: req.body.picture, score: req.body.score }).then(function (player) {
				res.json(player);
			});
		} else {
			res.json({ error: 'Jogador não cadastrado' });
		}
	});
});

exports.default = router;