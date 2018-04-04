'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/players').get(function (req, res) {
	_models.Player.findAll().then(function (players) {
		res.send(players);
	});
}).post(function (req, res) {
	var country = req.body.country;
	var position = req.body.position;
	var picture = req.body.picture;
	var score = req.body.score;

	var dataPlayer = { country: country, position: position, picture: picture, score: score };
});

router.route('/players/:player_id').get(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			res.json(player);
		} else {
			res.json({ message: 'Jogador não cadastrato' });
		}
	});
}).delete(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			player.destroy().then(function (player) {
				res.json({ message: 'Jogador Deletao' });
			});
		} else {
			res.json({ error: 'Jogador não cadastrato' });
		}
	});
}).put(function (req, res) {
	_models.Player.findById(req.params.player_id).then(function (player) {
		if (player) {
			player.update({ namePlayer: req.body.namePlayer, country: req.body.country, position: req.body.position, picture: req.body.picture, score: req.body.score }).then(function (player) {
				res.json(player);
			});
		} else {
			res.json({ error: 'Jogador não cadastrato' });
		}
	});
});

exports.default = router;