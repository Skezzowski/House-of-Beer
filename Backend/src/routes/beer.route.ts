import express from 'express'
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

let router = express.Router();
const beerModel = mongoose.model('Beer');

router.route('/beers').get((req, res) => {
	beerModel.find({}).select('name type pictureUrl')
		.then(beers => {
			return res.status(200).json(beers)
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({ msg: 'Váratlan adatbázis hiba' })
		});
});

router.route('/beers/:beerId').get((req, res) => {
	beerModel.findOne({ _id: req.params.beerId })
		.select('name description type ingredients pictureUrl timeToCook')
		.then(beer => {
			if (!beer) {
				return res.status(404).json({ msg: "Ilyen objektum nem létezik" })
			}
			return res.status(200).json(beer)
		})
		.catch((err: MongoError) => {
			console.log(err);
			return res.status(500).json({ msg: 'Váratlan adatbázis hiba vagy rossz id paraméter' })
		});
});

module.exports = router;