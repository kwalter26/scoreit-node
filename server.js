//Dependencies
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

import config from './config';
import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use('/',routes);



// Database Connection
//mongoose.connect(process.env.MONGO_STRING, function (err) {
mongoose.connect('mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/scoreitdb', (err) => {
    if (err) console.log('Mongoose:   Error occured!', err);
    else console.log('Mongoose:   Connected');
});

//require('./controllers/seeder');




// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.listen(config.server.port,config.server.host, () => {
    console.log('Example app listening on port '+config.server.serverUrl+'!');
});

export default app;
