import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String }
});

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    name: string;
    comparePasswords(password: string, next: CallableFunction): any
}

userSchema.pre('save', function (this: IUser, next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hash => {
                user.password = hash
                return next();
            })
            .catch(err => { return next(new Error('Bcrypt error: ' + err)) })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function (password: string, next: CallableFunction) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        return next(error, isMatch);
    })
}

export default mongoose.model<IUser>('User', userSchema);