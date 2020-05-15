import express from 'express'
import passport from 'passport'
import { MongoError } from 'mongodb';
import userModel from '../models/user.model';


let router = express.Router()

router.route('/login').post((req, res) => {
    if (req.body.username && req.body.password) {
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
    } else {
        res.status(403).json({ msg: 'Felhasználónév vagy jelszó hiányzik' });
    }
});

router.route('/logout').post((req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).json({ msg: 'Sikeres kijelentkezés' });
    } else {
        res.status(403).json({ msg: 'Felhasználó nincs bejelentkezve, ezért nem lehet kijelentkezni' })
    }
});

router.route('/register').post((req, res) => {
    if (req.body.username && req.body.password) {
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
    } else {
        res.status(403).json({ msg: 'Felhasználónév vagy jelszó hiányzik' });
    }
});

module.exports = router;