import express from 'express';
import {League, Team} from '../modelos/models';

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
                    error: 'usuário já é dono de uma liga'
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

router.route('/league/add_league')

	.post((req, res)=>{
		// procura a liga
		League.findOne({
			where: {
				id: req.body.league
			}
		}).then(league =>{
			//procura o usuario
			Team.findOne({
				where: {
					userId: req.body.user
				}
			}).then(team =>{
              
               /*  league.getTeams({team}).then(nda => {
                    res.json({
                        nda
                    });
                }) */
              
                team.addLeagues(league).then(ret => {
                    if(ret.length === 0){
                        res.json({
                            error: 'Time já pertence a liga'
                        });
                    }else{
                        res.json({
                            message: 'Time adicionado a liga com sucesso'
                        });
                    }
                })
			})
		})
    })

router.route('/league/list')

    .post((req, res)=>{
        League.findOne({
            where: {
                id: req.body.id
            }
        }).then(league =>{
            league.getTeams().then(teams =>{
                res.json(teams)
            })
        })
    })

export default router;
