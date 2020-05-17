import mongoose from 'mongoose'

const databaseUrlLocal = 'mongodb://localhost:27017/house-of-beer';
const databaseUrlOnline = 'mongodb+srv://Beer:beer@cluster0-dzhgu.mongodb.net/house-of-beer?retryWrites=true&w=majority'

mongoose.connect(databaseUrlOnline, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection ready!')
});