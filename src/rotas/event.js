import express from 'express';
import {Event} from '../modelos/models';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.route('/events')

	.get((req, res)=>{
		Event.findAll().then(function(event) {
			res.send(event);
		})
	})

	.post((req, res)=>{
		const round = req.body.round;
		const playerId = req.body.playerId;
		const tipoId = req.body.tipoId;
		
		const data = {
			round: req.body.round, 
			playerId: req.body.playerId,
			tipoId: req.body.tipoId,
		};
		
		Event.create(data).then((event)=> {
			res.json({
				message:'Evento cadastrado com sucesso!!'
			});
		})
	})

router.route('/events/:event_id')

	.get((req, res)=>{
		Event.findById(req.params.event_id).then(event => {
			if(event) {
				res.json(event);
			}else{
				res.json({message: 'Evento não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Event.findById(req.params.event_id).then(event => {
			if(event) {
				event.destroy().then((event)=>{
					res.json({message: 'Evento Deletado'});
				})
			}else{
				res.json({error: 'Evento não cadastrado'});
			}
		})
	})

export default router;