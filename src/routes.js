import express from 'express';
import {User} from './models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


let router = express.Router();

router.route('/users')

	.get((req, res)=>{
		User.findAll().then(function(users){
			res.send(users);
		})
	})

	.post((req, res)=>{
		const nickname = req.body.nickname;
		const email =  req.body.email;

		bcrypt.hash(req.body.password, 12).then((senha) =>{
			User.create({nickname: nickname, password: senha, email: email}).then((user)=>{
				res.json({message: 'User added'});
			})
		})
	})


export default router;