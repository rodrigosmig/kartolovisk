
import express from 'express';
import {Event, Player, Tipo} from '../modelos/models';

let router = express.Router();

router.route('/events')
	.get((req, res)=>{
		Event.findAll().then(function(event) {
			res.send(event);
		})
	})

	.post((req, res)=>{
	
		const data = {
			roundId: req.body.round, 
			playerId: req.body.playerId,
			tipoId: req.body.tipoId,			
		};
		
		Event.create(data).then((event)=> {
			Tipo.findOne({ 					
				where: {
					id: event.tipoId
				}
			}).then(tipo => {				
				if(tipo){
					
					Player.findOne({
						where: {
							id: event.playerId						
						}

					}).then(player => {
						if(player){
							const score = player.score + tipo.score
							player.update({
								score: score
							})
						}else{
							res.json({
								message: 'Player não existe!'
							})
						}

					})
				
				}
				
				
				else{
					res.json({
						message:'Tipo não existe'
					})
				}
			})
		

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
				res.json({error: 'Evento não deletado!'});
			}
		})
	})

export default router;