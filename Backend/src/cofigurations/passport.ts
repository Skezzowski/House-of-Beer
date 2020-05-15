import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';

import { IUser } from '../models/user.model';

const userModel = mongoose.model('User');

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
        if (err) {
            console.log(err)
            return done(new Error('There was an error while retrieving the user'));
        }
        if (user) {
            user.comparePasswords(password, function (error: Error, isMatch: boolean) {
                if (error || !isMatch) {
                    console.log(error);
                    return done(new Error('Wrong password'));
                }
                return done(null, user);
            })
        } else {
            return done(new Error('There is no registered user with that username'));
        }
    })
}));

console.log('Passport Configured')