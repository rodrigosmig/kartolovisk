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

router.route('/events/:event_id').get(function (req, res) {
	_models.Event.findById(req.params.event_id).then(function (event) {
		if (event) {
			res.json(event);
		} else {
			res.json({ message: 'Evento não cadastrado' });
		}
	});
}).delete(function (req, res) {
	_models.Event.findById(req.params.event_id).then(function (event) {
		if (event) {
			event.destroy().then(function (event) {
				res.json({ message: 'Evento Deletado' });
			});
		} else {
			res.json({ error: 'Evento não cadastrado' });
		}
	});
});

exports.default = router;