import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import './models/user.model'
import cors from 'cors';

//Routes
let login = require('./routes/login');

const port = 3000;
const app = express();
export const router = express.Router();

// Database Config
require('./cofigurations/database')

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Config
require('./cofigurations/passport');

app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

// CORS
let corsOptions = {
    origin: [
        "http://localhost:4200"
    ],
    credentials: true,
}
app.use(cors(corsOptions));

// Logger
app.use(morgan('tiny'));

router.use(login);
app.use(router);

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});

