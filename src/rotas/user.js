import express from 'express';
import {User} from '../modelos/models'; //./models
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

		User.findOne({where:{nickname: nickname}, attributes: ['id', ['nickname', 'email']]}).then(user=>{
			if(user){
				return res.send({message: 'Esse nick já existe'});
			}else{
				User.findOne({ where: { email: email }, attributes: ['id', ['nickname', 'email']] }).then(user => {
					if (user) {
						return res.json({ message: 'Esse email já existe' });
					}else{
						bcrypt.hash(req.body.password, 12).then((senha) => {
							User.create({ nickname: nickname, 
								email: email, 
								password: senha 
							}).then((user) => {
								res.json({ message: "Usuário cadastrado"});
							})
						})
					}
				})
			}
		})

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

	.put((req, res)=>{
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
		User.findById(req.params.user_id).then(user =>{
			if (user) {
				let senha = bcrypt.hashSync(req.body.password, 12);
				user.update({
					email: req.body.email, 
					nickname: req.body.nickname, 
					password: senha
				}).then(() =>{
					res.json(user);
				})
			} else{
				res.json({error: 'erro na atualizacao'});
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