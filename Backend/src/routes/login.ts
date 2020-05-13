import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose';

const userModel = mongoose.model('User');
let router = express.Router()

router.route('/login').post((req, res) => {
    if(req.body.username && req.body.password) {
        console.log("login route")
        passport.authenticate('local', (error, user) => {
            if(error) {
                return res.status(403).send(error);
            } else {
                req.logIn(user, (error) => {
                    if(error) return res.status(500).send(error);
                    return res.status(200).send("A bejelentkezés sikeres");
                });
            }
        })(req,res);
    } else {
        res.status(400).send("Hiányzó usernév vagy jelszó");
    }
});

router.route('/logout').post((req, res) => {
    //console.log(req.session.passport.user);
    if(req.isAuthenticated()) {
        req.logout();
        res.status(200).send("Kijelentkezés sikeres");
    } else {
        res.status(403).send("Jelentkezz előbb be, hogy kijelentkezhess")
    }
});

router.route('/register').post((req, res) => {
    if(req.body.username && req.body.password) {
        const user = new userModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name ? req.body.name : ""
        });
        user.save(function(error) {
            if(error) return res.status(500).send(error);
            return res.status(200).send('User registered!');
        })
    } else {
        return res.status(400).send("Username or password is missing");
    }
});

module.exports = router;