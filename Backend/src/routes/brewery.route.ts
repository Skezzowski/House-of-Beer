import express from 'express'
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

let router = express.Router();
const breweryModel = mongoose.model('Brewery');

router.route('/breweries').get((req, res) => {
    breweryModel.find({}).select('name location pictureUrl')
        .then(breweries => {
            return res.status(200).json(breweries)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ msg: 'Váratlan adatbázis hiba' })
        });
});

router.route('/breweries/:breweryId').get((req, res) => {
    breweryModel.findOne({ _id: req.params.breweryId })
        .then(brewery => {
            if (!brewery) {
                return res.status(404).json({ msg: "Ilyen objektum nem létezik" })
            }
            return res.status(200).json(brewery)
        })
        .catch((err: MongoError) => {
            console.log(err);
            return res.status(500).json({ msg: 'Váratlan adatbázis hiba vagy rossz id paraméter' })
        });
});

module.exports = router;