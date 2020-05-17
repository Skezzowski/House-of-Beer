import mongoose from 'mongoose';
import { IBeer } from './beer.model';
import { IUser } from './user.model';
import { Int32 } from 'mongodb';

const brewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer' },
	activeStageIndex: { type: Number, default: 0 },
	lastModificationDate: { type: Date },
})

export interface IBrew extends mongoose.Document {
	user: IUser,
	beer: IBeer,
	lastModificationDate: Date,
	activeStageIndex: number,
	compareDate(): Number
}

export interface IBrewMenuModel {
	brewId: String,
	beerId: String,
	beerName: String,
	beerType: String,
	actionNeeded: Boolean
}

brewSchema.pre('save', function (this: IBrew, next) {
	const brew = this;
	brew.lastModificationDate = new Date();
	next();
})

brewSchema.methods.compareDate = function () {
	return Date.now() - this.dateCreated.getTime();
}

export default mongoose.model<IBrew>('Brew', brewSchema);