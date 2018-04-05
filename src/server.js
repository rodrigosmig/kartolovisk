import express from 'express';
import UserRoute from './rotas/user';
import PlayerRoute from './rotas/player';
import TeamRoute from './rotas/team';
import EventRoute from 	'./rotas/event';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', UserRoute);
app.use('/', PlayerRoute);
app.use('/',EventRoute);
app.use('/', TeamRoute);


app.listen(3000, () => {
	console.log('App na porta 3000!');
})