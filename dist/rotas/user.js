'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//./models
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

	_models.User.findOne({ where: { nickname: nickname }, attributes: ['id', ['nickname', 'email']] }).then(function (user) {
		if (user) {
			return res.send({ message: 'Esse nick já existe' });
		} else {
			_models.User.findOne({ where: { email: email }, attributes: ['id', ['nickname', 'email']] }).then(function (user) {
				if (user) {
					return res.json({ message: 'Esse email já existe' });
				} else {
					_bcrypt2.default.hash(req.body.password, 12).then(function (senha) {
						_models.User.create({ nickname: nickname,
							email: email,
							password: senha
						}).then(function (user) {
							res.json({ message: "Usuário cadastrado" });
						});
					});
				}
			});
		}
	});

	/*
 	SEM VERIFICAR NICK E SENHA
 bcrypt.hash(req.body.password, 12).then((senha) =>{
 	User.create({
 		nickname: nickname,
 		password: senha, 
 		email: email
 	}).then((user)=>{
 		res.json({message: 'Usuário cadastrado'});
 	})
 })*/
});

// um usuario especifico
router.route('/users/:user_id').get(function (req, res) {
	_models.User.findById(req.params.user_id).then(function (user) {
		if (user) {
			res.json(user);
		} else {
			res.json({ message: 'Usuário não existe' });
		}
	});
}).put(function (req, res) {
	/*
 User.findById(req.params.user_id).then(user =>{
 	if(user){
 		bcrypt.hashSync(req.body.password, 12).then((senha) =>{
 			user.update({
 				login: login, 
 				password: senha, 
 				email: email
 			}).then(()=>{
 				res.json({message: user});
 			})
 		})
 	}else{
 		res.json({error: 'erro na atualizacao'});
 	}
 })
 	
 	SÓ FUNCIONA SE TIVER TODOS OS CAMPOS, esse que ta comentado foi um teste
 	e não funcionou*/
	_models.User.findById(req.params.user_id).then(function (user) {
		if (user) {
			var senha = _bcrypt2.default.hashSync(req.body.password, 12);
			user.update({
				email: req.body.email,
				nickname: req.body.nickname,
				password: senha
			}).then(function () {
				res.json(user);
			});
		} else {
			res.json({ error: 'erro na atualizacao' });
		}
	});
}).delete(function (req, res) {
	_models.User.findById(req.params.user_id).then(function (user) {
		if (user) {
			user.destroy().then(function (user) {
				res.json({ message: 'Usuário deletado' });
			});
		} else {
			res.json({ error: 'Usuário não encontrado' });
		}
	});
});

router.route('/auth').get(function (req, res) {
	res.json({ message: 'teste' });
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