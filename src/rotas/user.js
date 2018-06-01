import express from 'express';
import {User, League, Team} from '../modelos/models'; //./models
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

let router = express.Router();
const Op = Sequelize.Op;

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
		{ name: '1111', score: 0, user: '', formation: '' }
	*/
	.post((req, res)=>{
		
		const nickname = req.body.nickname;
		const email =  req.body.email;
		const user_team = req.body.team
		console.log(user_team)
		User.findOne({where:{nickname: nickname}, attributes: ['id', ['nickname', 'email']]}).then(user=>{
			if(user){
				return res.status(401).send({
					error: 'Esse nick já existe'
				});
			}else{
				User.findOne({ where: { email: email }, attributes: ['id', ['nickname', 'email']] }).then(user => {
					if (user) {
						return res.status(401).send({ 
							error: 'Esse email já existe' 
						});
					}
					else {
						Team.findOne({
							where: {
								name: user_team.name
							}
						}).then(isExists => {
							//verifica se o nome do time já está sendo utilizado
							if(!isExists) {
								bcrypt.hash(req.body.password, 12).then((senha) => {
									User.create({ nickname: nickname, 
										email: email, 
										password: senha 
									}).then((user) => {
										const data = {
											name: user_team.name, 
											formationId: '1',
											score: 0,
											userId: user.id,
										};
										Team.create(data).then((team)=> {
											res.json({
												message:'Usuário cadastrado com sucesso!!'
											});
										})
									})
								})
								
												
							}
							else {
								res.status(400).send({
									error: 'O nome do time já está sendo utilizado.'
								});
							}
						
						})

					}
				})
			}
		})
	})

// um usuario especifico
router.route('/users/:user_id')

	.get((req, res)=>{
		User.findById(req.params.user_id).then(user =>{
			if (user) {
				res.json(user);
			}else{
				res.status(404).send({
					error: 'Usuário não existe'
				});
			}
		})
	})

	.put((req, res)=>{

		User.findById(req.params.user_id).then(user =>{
			if (!(typeof req.body.password === "undefined")){
				let senha = bcrypt.hashSync(req.body.password, 12)
				user.update({
					email: req.body.email, 
					nickname: req.body.nickname,
					password: senha 
				}).then((user)=>{
					res.json(user);
				})
			}else{
				user.update({
					email: req.body.email, 
					nickname: req.body.nickname
				}).then((user)=>{
					res.json(user);
				})
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
				res.status(404).send({
					error: 'Usuário não encontrado'
				});
			}
		})
	})

// retorna usuario especifico pelo nome
router.route('/users/name/:user_name')

	.get((req, res)=>{

		const userName = req.params.user_name
		
		User.findOne({
			where: {
				nickname: userName
			}
		}).then(user => {
			if(user){
				res.json(user)
			}else{
				res.status(404).send({
					error: "Usuário não encontrado"
				})
			}
		})
	})

router.route('/auth')

	.post((req, res) =>{
		User.findOne({where: {nickname: req.body.nickname}}).then((user) =>{

			if (user) {
				console.log('entrooou');
				bcrypt.compare(req.body.password, user.password).then((senha) =>{
					if (senha) {
						const token = jwt.sign(user.get({plain:true}), "senha");

						res.json({message: 'Usuário autenticado', token:token});
					}else{
						res.status(404).send({error: 'Senha incorreta'});
					}
				})
			} else {
				res.status(404).send({error: 'Usuário não encontrado'});
			}
		})
	})

router.route('/profile')

	.get((req, res)=>{
		const token = req.headers['x-access-token'];

		if(token){
			jwt.verify(token, 'senha', (err, decoded)=>{
				res.json(decoded);
			})
		}else{
			res.json({message: 'Token não encontrado'});
		}
	});

export default router;
