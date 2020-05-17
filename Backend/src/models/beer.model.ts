import mongoose from 'mongoose'

const beerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String, required: true },
	pictureUrl: { type: String, required: false },
	ingredients: { type: Array, required: true },
	timeToCook: { type: Number, required: true },
	stages: { type: Array, required: true }
})

export interface IBeer extends mongoose.Document {
	name: String,
	type: String,
	description: String,
	pictureUrl: String,
	ingredients: Array<String>,
	timeToCook: Number,
	stages: Array<Stage>
}

export interface Stage {
	name: String,
	description: String,
	time: number
}

export default mongoose.model<IBeer>('Beer', beerSchema);