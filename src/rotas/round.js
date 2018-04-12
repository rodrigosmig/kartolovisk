import express from 'express';
import {Round} from '../modelos/models';

let router = express.Router();

router.route('/round')
    .get((req, res)=>{
        Round.findAll().then(function(round){
            res.send(round);
        })
    })

    .post((req, res)=>{
        const data = {
			round: req.body.round									
        };

        Round.create(data).then((round)=>{
            res.json({messagem:'Cadastro do round com sucesso'});
        });


    })

export default router;