import express from 'express';
import { League, Team, User } from '../modelos/models';

let router = express.Router();

function sortByScore(x,y) {
	return y.score - x.score; 
}

router.route('/league')

    .get((req, res) => {
        League.findAll().then(function (league) {
            res.send(league);
        })
    })

    .post((req, res) => {
        User.findOne({
            where: {
                id: req.body.userId,
            }
        }).then(user => {
            console.log(user)
            League.findOne({
                where: {
                    name: req.body.name
                }
            }).then(hasLeague => {
                console.log(hasLeague)
                // verifica se a liga já existe
                if (!hasLeague) {
                    const data = {
                        name: req.body.name,
                        userId: req.body.userId,
                    };
                    League.create(data).then((league) => {
                        Team.findOne({
                            where: {
                                userId: req.body.userId
                            }
                        }).then(team => {
                            team.addLeagues(league).then(ret => {
                                res.json({
                                    message: 'Liga cadastrada com sucesso!'
                                });
                            })
                        })
                    })

                } else {
                    res.status(401).send({
                        error: 'O nome da liga já existe'
                    });
                }
            })

        })

    })

router.route('/league/:league_id')

    .get((req, res) => {
        League.findById(req.params.league_id).then(league => {
            if (league) {
                res.json(league);
            } else {
                res.status(404).send({
                    error: 'Essa liga não existe'
                });
            }
        })
    })

    .put((req, res) => {

        League.findById(req.params.league_id).then(league => {
            if (league) {
                league.update({
                    name: req.body.name
                }).then((league => {
                    res.json(league);
                }))
            } else {
                res.status(404).send({
                    error: 'Liga não cadastrada' 
                });
            }
        })
    })

    .delete((req, res) => {
        League.findById(req.params.league_id).then(league => {
            if (league) {
                league.destroy().then((league) => {
                    res.json({ message: 'Liga deletada' });
                })
            } else {
                res.status(404).send({
                    error: 'Liga não cadastrada'
                });
            }
        })
    })
// adiciona e remove times da liga
router.route('/league/team/:league_id')

    // adicionar um usuario a liga
    .post((req, res) => {
        // procura a liga
        League.findOne({
            where: {
                id: req.params.league_id
            }
        }).then(league => {
            //procura o usuario
            Team.findOne({
                where: {
                    userId: req.body.user
                }
            }).then(team => {
                team.addLeagues(league).then(ret => {
                    console.log(ret)
                    if (ret.length === 0) {
                        res.status(400).send({
                            error: 'Time já pertence a liga'
                        });
                    } else {
                        res.json({
                            message: 'Time adicionado a liga com sucesso'
                        });
                    }
                })
            })
        })
    })

    .delete((req, res)=>{

        // procura a liga
        League.findOne({
            where: {
                id: req.params.league_id
            }
        }).then(league =>{
            // procura o time associado ao usuario
            Team.findOne({
                where: {
                    userId: req.body.user
                }
            }).then(team =>{
                //verifica se o time esta na liga
                team.hasLeagues(league).then(hasLeague =>{
                    if(hasLeague){
                        // remove um usuario da liga
                        team.removeLeagues(league).then(ret =>{
                            res.json({message: 'Time foi removido da liga'});
                        })
                    }else{
                        res.status(404).send({
                            error: 'Usuário não está na liga'
                        });
                    }
                })
            })
        }) 
    })

//lista os times de uma liga
router.route('/league/list/:id')

    .get((req, res) => {
        League.findOne({
            where: {
                id: req.params.id
            }
        }).then(league => {
            if (league) {
                league.getTeams().then(teams => {
                    teams.sort(sortByScore)
                    res.json(teams)
                })
            } else {
                res.status(404).send({
                    error: 'Não existe esta liga!'
                });
            }
        })
    })

//lista liga de um usuario
router.route('/league/user/:user_id')
    .get((req, res) => {
        League.findAll({
            where: {
                userId: req.params.user_id
            }
        }).then(leagues => {
            console.log(leagues.length)
            if(leagues.length !== 0) {
                res.send(leagues);
            } else {
                res.status(404).send({
                    error: 'Não existe esta liga!'
                });
            }
        })
    })

export default router;
