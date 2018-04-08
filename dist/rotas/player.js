'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function destination(req, file, cb) {
		cb(null, './imagens/');
	},
	filename: function filename(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

var upload = multer({ storage: storage });

var router = _express2.default.Router();

router.route('/players').get(function (req, res) {
	_models.Player.findAll().then(function (players) {
		res.send(players);
	});
}).post(upload.single('imagePlayer'), function (req, res, next) {
	var name = req.body.name;
	var country = req.body.country;
	var position = req.body.position;
	var score = req.body.score;
	var imagePlayer = req.file.path;

	var data = { name: name, country: country, position: position, score: score, imagePlayer: imagePlayer };

	_models.Player.create(data).then(function (players) {
		res.json({ message: 'cadastro com sucesso!' });
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
			player.update({
				name: req.body.name,
				country: req.body.country,
				position: req.body.position,
				score: req.body.score
			}).then(function (player) {
				res.json(player);
			});
		} else {
			res.json({ error: 'Jogador não cadastrado' });
		}
	});
});

exports.default = router;