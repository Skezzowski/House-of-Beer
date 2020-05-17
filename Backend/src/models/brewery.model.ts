import mongoose from 'mongoose'

const brewerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    description: { type: String, required: true }
})

export interface IBrewery extends mongoose.Document {
    name: String,
    location: String,
    pictureUrl: String,
    description: String
}

export default mongoose.model<IBrewery>('Brewery', brewerySchema);