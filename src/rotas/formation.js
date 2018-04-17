import express from 'express';
import {Formation} from '../modelos/models';


let router = express.Router();

router.route('/formation')
   
    .get((req, res)=>{
        Formation.findAll().then(function(type){
            res.send(type);
        });
    })

    .post((req, res)=>{
        const data = {
			formation: req.body.formation,				
        };
        Formation.create(data).then(function(type){
            res.json({message: 'Formação cadastrada com sucesso'});
        })		
    })

router.route('/players/:formation_id')

	.get((req, res)=>{
		Formation.findById(req.params.formation_id).then(formation =>{
			if(formation) {
				res.json(formation);
			}else{
				res.json({message: 'Formação não cadastrada'});
			}
		})
	})	

	.delete((req, res)=>{
		Formation.findById(req.params.formation_id).then(formation =>{
			if(formation) {
				formation.destroy().then((formation)=>{
					res.json({message: 'Formação Deletada'});
				})
			}else{
				res.json({error: 'Formação não cadastrada'});
			}
		})
	})

export default router;