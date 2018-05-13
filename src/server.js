import express from 'express';
import UserRoute from './rotas/user';
import PlayerRoute from './rotas/player';
import TeamRoute from './rotas/team';
import EventRoute from 	'./rotas/event';
import LeagueRoute from './rotas/league';
import RoundRoute from './rotas/round';
import TypeRoute from './rotas/type';
import FormationRoute from './rotas/formation';
import bodyParser from 'body-parser';
import cors from 'cors'

let app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', LeagueRoute);
app.use('/', UserRoute);
app.use('/', PlayerRoute);
app.use('/',EventRoute);
app.use('/',RoundRoute);
app.use('/',TypeRoute);
app.use('/', TeamRoute);
app.use('/', FormationRoute);



app.listen(3000, () => {
	console.log('App na porta 3000!');
})