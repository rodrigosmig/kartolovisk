import express from 'express';
import {Event} from '../modelos/models';
import {Player} from '../modelos/models';
import jwt from 'jsonwebtoken';



let router = express.Router();



router.route('/eventos')

	.get((req, res)=>{
		Event.findAll().then(function(evento){
			res.send(evento);
		})
    })
    
    
    











export default router;