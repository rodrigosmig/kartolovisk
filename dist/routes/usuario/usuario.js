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
}).post(function (req, res) {
	var nickname = req.body.nickname;
	var email = req.body.email;

	_bcrypt2.default.hash(req.body.password, 12).then(function (senha) {
		_models.User.create({ nickname: nickname, password: senha, email: email }).then(function (user) {
			res.json({ message: 'User added' });
		});
	});
});

exports.default = router;