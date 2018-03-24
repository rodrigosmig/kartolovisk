import express from 'express';
import rotas from './routes'; // bookRouter
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', rotas);


app.listen(3000, () => {
	console.log('App na porta 3000!');
})