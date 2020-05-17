import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

import './models/user.model';
import './models/beer.model';
import './models/brewery.model';
import './models/brew.model';

const port = 3000;
const app = express();
export const router = express.Router();

// Database Config
require('./cofigurations/database');

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

//Routes
let loginRoutes = require('./routes/login.route');
let beerRoutes = require('./routes/beer.route');
let breweryRoutes = require('./routes/brewery.route');
let brewRoutes = require('./routes/brew.route');

router.use(breweryRoutes);
router.use(loginRoutes);
router.use(beerRoutes);
router.use(brewRoutes);
app.use(router);

app.listen(port, () => {
	console.log('Server is running on port: ' + port);
});

