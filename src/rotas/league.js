import express from 'express';
import {League} from '../modelos/models';

let router = express.Router();

router.route('/league')

    .get((req, res)=>{
        League.findAll().then(function(league){
            res.send(league);
        })
    })

    .post((req, res)=>{
        
        League.findOne({
            where: {
                userId: req.body.userId,
            }
        }).then(league => {
            // não cria duas ligas com o mesmo nome
            if (!league){
                League.findOne({
    
                   where: {
                       name: req.body.name
                   } 
                }).then(hasLeague =>{
                    // verifica se a liga já existe
                    if(!hasLeague){
                        const data = {
                            name: req.body.name,
                            userId:req.body.userId,
                        };
                        League.create(data).then((league)=>{
                            res.json({
                                message: 'Liga cadastrada com sucesso!'
                            });
                        })
                    }else{
                        res.json({
                            error: 'O nome da liga já existe'
                        });
                    }
                })
            } else{
                res.json({
                    error: 'O nome da liga já existe'
                });
            }
        })

    })

router.route('/league/:league_id')

    .get((req, res)=>{
        League.findById(req.params.league_id).then(league =>{
            if (league) {
                res.json(league);
            } else {
                res.json({
                    message: 'Essa liga não existe'
                });
            }
        })
    })

    .delete((req, res)=>{
		League.findById(req.params.league_id).then(league => {
			if(league) {
				league.destroy().then((league)=>{
					res.json({message: 'Liga deletada'});
				})
			}else{
				res.json({
                    error: 'Liga não cadastrada'
                });
			}
		})
    })

router.route('')

export default router;