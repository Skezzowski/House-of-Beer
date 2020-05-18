import mongoose from 'mongoose';
import { IBeer } from './beer.model';
import { IUser } from './user.model';
import { hourToMilliseconds, millisecondsToHour } from '../util/helper-functions';

const brewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer' },
	activeStageIndex: { type: Number, default: 0 },
	done: { type: Boolean, default: false },
	lastModificationDate: { type: Date }
})

export interface IBrew extends mongoose.Document {
	user: IUser,
	beer: IBeer,
	lastModificationDate: Date,
	activeStageIndex: number,
	done: boolean,
	isActionNeeded(): boolean,
	getTimeBeforeNextStage(): number
}

export interface IBrewMenuModel {
	brewId: String,
	beerId: String,
	beerName: String,
	beerType: String,
	actionNeeded: Boolean,
	done: Boolean
}

brewSchema.pre('save', function (this: IBrew, next) {
	const brew = this;
	brew.lastModificationDate = new Date();
	next();
})

brewSchema.methods.isActionNeeded = function () {
	if (this.done) {
		return false;
	}
	let timeSinceLastStage = Date.now() - this.lastModificationDate.getTime()
	return timeSinceLastStage > hourToMilliseconds(this.beer.stages[this.activeStageIndex].time)
}

/**
 * Returns time before next stage in hours
 */
brewSchema.methods.getTimeBeforeNextStage = function () {
	const timeWhenStageDone = this.lastModificationDate.getTime() +
		hourToMilliseconds(this.beer.stages[this.activeStageIndex].time);

	const timeBeforeStageDone: number = timeWhenStageDone - Date.now();
	if (timeBeforeStageDone <= 0) {
		return -1;
	} else {
		return millisecondsToHour(timeBeforeStageDone);
	}
}

export default mongoose.model<IBrew>('Brew', brewSchema);