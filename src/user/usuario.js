import express from 'express';
import {User} from './models'; //./models
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.route('/users')

	.get((req, res)=>{
		User.findAll().then(function(users){
			res.send(users);
		})
	})

	/*
		Ordem pra passar no json quando for criar o usuario:
		nickname
		email
		password
	*/
	.post((req, res)=>{
		const nickname = req.body.nickname;
		const email =  req.body.email;

		bcrypt.hash(req.body.password, 12).then((senha) =>{
			User.create({nickname: nickname, password: senha, email: email}).then((user)=>{
				res.json({message: 'Usuário cadastrado'});
			})
		})
	})

// um usuario especifico
router.route('/users/:user_id')

	.get((req, res)=>{
		User.findById(req.params.user_id).then(user =>{
			if (user) {
				res.json(user);
			}else{
				res.json({message: 'Usuário não existe'});
			}
		})
	})

	.delete((req, res) =>{
		User.findById(req.params.user_id).then(user => {
			if (user) {
				user.destroy().then((user) => {
					res.json({message: 'Usuário deletado'});
				})
			} else{
				res.json({error: 'Usuário não encontrado'});
			}
		})
	})

router.route('/auth')
	
	.get((req, res)=>{
		res.json({message: 'teste'});
	})

	.post((req, res) =>{
		User.findOne({where: {nickname: req.body.nickname}}).then((user) =>{
			if (user) {
				bcrypt.compare(req.body.password, user.password).then((senha) =>{
					if (senha) {
						const token = jwt.sign(user.get({plain:true}), "senha");

						res.json({message: 'Usuário autenticado', token:token});
					}else{
						res.json({message: 'Senha incorreta'});
					}
				})
			} else {
				res.json({message: 'Usuário não encontrado'});
			}
		})
	})

export default router;