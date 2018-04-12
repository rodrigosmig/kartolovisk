import express from 'express';
import {Tipo} from '../modelos/models';


let router = express.Router();

router.route('/type')
   
    .get((req, res)=>{
        Tipo.findAll().then(function(type){
            res.send(type);
        });
    })

    .post((req, res)=>{
        const data = {
			name: req.body.name,
			score: req.body.score
						
        };
        
        Tipo.create(data).then(function(type){
            res.json({message: 'cadastro tipo com sucesso'});
        })
		
    })

export default router;