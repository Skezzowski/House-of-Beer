import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import './models/user.model'
import { IUser } from './models/user.model';
import cors from 'cors';



let login = require('./routes/login');

const port = 3000;
const app = express();
export const router = express.Router();

// Database
const userModel = mongoose.model<IUser>('User');

const databaseUrl = 'mongodb://localhost:27017/house-of-beer';
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Database connection ready!')
});


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
passport.serializeUser((user, done) => {
	if (!user) return done("Hiba - nincs user", undefined);
	return done(null, user);
});

passport.deserializeUser((user, done) => {
	if (!user) return done("Hiba - nincs user, akit kileptethetnenk", undefined);
	return done(null, user);
});

passport.use('local', new passportLocal.Strategy((username, password, done) => {
	userModel.findOne({ username: username }, function (err, user: IUser) {
		if (err) return done('There was an error while retrieving the user');
		if (user) {
			user.comparePasswords(password, function (error: Error, isMatch: boolean) {
				if (error || !isMatch) return done('There was an error when comparing the passwords or wrong password');
				return done(null, user);
			})
		} else {
			return done('There is no registered user with that username');
		}
	})
}));

app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
	origin: [
		"http://localhost:4200"
	], credentials: true
}));

// Logger
app.use(morgan('tiny'));

router.use(login);
app.use(router);

app.listen(port, () => {
	console.log('Server is running on port: ' + port)
});

