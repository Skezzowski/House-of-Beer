import passport from 'passport';
import passportLocal from 'passport-local';

import userModel from '../models/user.model';

const loginError = new Error('Hibás felhasználónév vagy jelszó');

passport.serializeUser((user, done) => {
	if (!user) return done("Hiba - nincs user", undefined);
	return done(null, user);
});

passport.deserializeUser((user, done) => {
	if (!user) return done("Hiba - nincs user, akit kileptethetnenk", undefined);
	return done(null, user);
});

passport.use('local', new passportLocal.Strategy((username, password, done) => {
	userModel.findOne({ username: username })
		.then(async user => {
			if (user) {
				const isMatch = await user.comparePasswords(password);
				if (isMatch) {
					return done(null, user);
				} else {
					throw new Error()
				}
			}
		})
		.catch(err => {
			console.log(err);
			return done(loginError);
		})
}));

console.log('Passport Configured')