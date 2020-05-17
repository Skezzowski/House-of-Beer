import express from 'express'
import { AuthChecker } from '../util/auth.middleware';
import brewModel from '../models/brew.model';
import { brewsToMenuModel, isActionNeeded, getTimeBeforeNextStage } from '../util/brew.calc';
import { MongoError } from 'mongodb';
import { stat } from 'fs';

const router = express.Router();

router.route('/brew/start').post(AuthChecker, (req, res) => {
	if (!req.body.beerId) {
		return res.status(403).json({ msg: 'Hiányzó adat' })
	}
	const brew = new brewModel({
		user: req.session?.passport.user._id,
		beer: req.body.beerId
	});
	brew.save()
		.then(_ => res.status(200).json({ msg: 'Főzés sikeresen elkezdődött' }))
		.catch(error => {
			console.log(error);
			res.status(500).json({ msg: 'hiba' });
		});
});

router.route('/brews').get(AuthChecker, (req, res) => {
	brewModel.find({ user: req.session?.passport.user._id })
		.populate('beer')
		.then(brews => {
			res.status(200).json(brewsToMenuModel(brews))
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ msg: 'Váratlan hiba' });
		});
});

router.route('/brew/action').post(AuthChecker, (req, res) => {
	brewModel.findById(req.body.brewId)
		.populate('beer')
		.then(brew => {
			if (brew) {
				if (!isActionNeeded(brew)) {
					throw new Error('Az előző akció még folyamatban van')
				}
				if (brew.activeStageIndex === brew.beer.stages.length - 1) {
					res.status(200).json({ msg: 'A sör már készen van' })
				} else {
					brew.activeStageIndex = brew.activeStageIndex + 1;
				}
			} else {
				throw new Error('Nincs ilyen indexű főzés');
			}
			return brew.save();
		})
		.then(_ => {
			return res.status(200).json({ msg: 'Akció sikeres!' })
		})
		.catch((error: Error) => {
			if (error instanceof MongoError) {
				console.log(error)
				res.status(500).json({ msg: 'Váratlan hiba' });
			} else {
				res.status(403).json({ msg: error.message });
			}
		});
});

router.route('/brew/:brewId').get(AuthChecker, (req, res) => {
	brewModel.findOne({ _id: req.params.brewId, user: req.session?.passport.user._id })
		.populate('beer')
		.then(brew => {
			if (brew) {
				const result = {
					currentStageIndex: brew.activeStageIndex,
					stages: brew.beer.stages,
					timeBeforeNextStage: getTimeBeforeNextStage(brew)
				}
				return res.status(200).json(result);
			} else {
				return res.status(403).json({ msg: 'Nincs ilyen indexű főzés' });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ msg: 'Váratlan hiba' });
		})
});

router.route('/brew/:brewId').delete(AuthChecker, (req, res) => {
	brewModel.deleteOne({ _id: req.params.brewId, user: req.session?.passport.user._id })
		.then(status => {
			if (status.ok) {
				res.status(200).json({ msg: 'Törlés sikeres' });
			} else {
				throw new Error();
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ msg: 'Váratlan hiba' });
		})
});

module.exports = router;