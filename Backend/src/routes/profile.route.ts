import express from 'express';
import { authChecker } from '../util/middlewares';
import userModel from '../models/user.model';
import { IError } from '../util/helper-functions';
import { MongoError } from 'mongodb';

let router = express.Router();

router.route('/profile').get(authChecker, (req, res) => {

	const user = {
		name: req.session?.passport.user.name,
		username: req.session?.passport.user.username
	}

	return res.status(200).json(user);
});

router.route('/profile/chpasswd').post(authChecker, (req, res) => {
	userModel.findById(req.session?.passport.user._id)
		.then(async (user) => {
			if (!req.body.oldpswd || !req.body.newpswd) {
				throw new IError(403, 'Hiányzó adat');
			}
			if (user) {
				const isMatch = await user.comparePasswords(req.body.oldpswd);
				if (isMatch) {
					user.password = req.body.newpswd;
					return user.save()
				} else {
					throw new IError(401, 'Rossz jelszó')
				}
			} else {
				throw new IError(403, 'Felhasználó nincs az adatbázisban');
			}
		})
		.then(_ => {
			return res.status(200).json({ msg: 'Sikeres jelszóváltás' })
		})
		.catch((error: MongoError | IError | any) => {
			if (error instanceof MongoError) {
				console.log(error);
				return res.status(500).json({ msg: 'Adatbázis hiba' });
			}
			if (error instanceof IError) {
				return res.status(error.status).json({ msg: error.message });
			}
			console.log(error);
			return res.status(500).json({ msg: 'Váratlan hiba' });
		});
});

module.exports = router;