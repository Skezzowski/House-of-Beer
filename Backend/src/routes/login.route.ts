import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { MongoError } from 'mongodb';
import userModel from '../models/user.model';
import { userNamePasswordChecker } from '../util/middlewares';

let router = express.Router()

router.route('/login').post(userNamePasswordChecker, (req, res) => {
	passport.authenticate('local', (error: Error, user) => {
		if (error) {
			return res.status(401).json({ msg: error.message });
		} else {
			req.logIn(user, (error) => {
				if (error) return res.status(500).json({ msg: error.message });
				return res.status(200).json({ msg: 'Bejelentkezés sikeres' });
			});
		}
	})(req, res);
});

router.route('/logout').post((req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.status(200).json({ msg: 'Sikeres kijelentkezés' });
	} else {
		res.status(403).json({ msg: 'Felhasználó nincs bejelentkezve, ezért nem lehet kijelentkezni' })
	}
});

router.route('/register').post(userNamePasswordChecker, (req, res) => {
	const user = new userModel({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name ? req.body.name : ''
	});
	user.save()
		.then(_ => res.status(200).json({ msg: 'Sikeres regisztráció' }))
		.catch((err: MongoError) => {
			if (err.code == 11000) {
				return res.status(403).json({ msg: 'Felhasználónév foglalt' })
			} else {
				return res.status(500).json({ msg: 'Várlatlan hiba' })
			}
		})
});

router.route('/authcheck').get((req, res) => {
	return res.status(200).json(req.isAuthenticated());
});

module.exports = router;