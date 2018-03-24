'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./models');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/users').get(function (req, res) {
	_models.User.findAll().then(function (users) {
		res.send(users);
	});
})

/*
	Ordem pra passar no json quando for criar o usuario:
	nickname
	email
	password
*/
.post(function (req, res) {
	var nickname = req.body.nickname;
	var email = req.body.email;

	_bcrypt2.default.hash(req.body.password, 12).then(function (senha) {
		_models.User.create({ nickname: nickname, password: senha, email: email }).then(function (user) {
			res.json({ message: 'Usuário cadastrado' });
		});
	});
});

router.route('/users/:user_id').get(function (req, res) {
	_models.User.findById(req.params.user_id).then(function (user) {
		if (user) {
			res.json(user);
		} else {
			res.json({ message: 'Usuário não existe' });
		}
	});
});

router.route('/auth').get(function (req, res) {
	res.json({ message: 'olarr' });
}).post(function (req, res) {
	_models.User.findOne({ where: { nickname: req.body.nickname } }).then(function (user) {
		if (user) {
			_bcrypt2.default.compare(req.body.password, user.password).then(function (senha) {
				if (senha) {
					var token = _jsonwebtoken2.default.sign(user.get({ plain: true }), "senha");

					res.json({ message: 'Usuário autenticado', token: token });
				} else {
					res.json({ message: 'Senha incorreta' });
				}
			});
		} else {
			res.json({ message: 'Usuário não encontrado' });
		}
	});
});

exports.default = router;