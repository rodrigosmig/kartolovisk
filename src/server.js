import express from 'express';
import bookRouter from './routes';
import bodyParser from 'body-parser';
import {Book} from './models';

let app = express();
app.use('/', bookRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(3000, () => {
console.log('Example app listening on port 3000!');
})