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
                    return res.status(200).json({ msg: "Login successfull" });
                });
            }
        })(req, res);
    } else {
        res.status(403).json({ msg: "Missing username or password" });
    }
});

router.route('/logout').post((req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).json({ msg: "Logout succesfull" });
    } else {
        res.status(403).json({ msg: "No user in session to logout" })
    }
});

router.route('/register').post((req, res) => {
    if (req.body.username && req.body.password) {
        const user = new userModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name ? req.body.name : ""
        });
        user.save()
            .then(_ => res.status(200).json({ msg: 'User registered!' }))
            .catch((err: MongoError) => {
                if (err.code == 11000) {
                    return res.status(403).json({ msg: 'Username already exists' })
                } else {
                    return res.status(500).json({ msg: 'Database error' })
                }
            })
    } else {
        res.status(403).json({ msg: "Missing username or password" });
    }
});

module.exports = router;