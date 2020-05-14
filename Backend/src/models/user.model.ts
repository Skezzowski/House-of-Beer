import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String}
});

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    name: string;
    comparePasswords(password:string, next: CallableFunction): any
}

userSchema.pre('save', function(this: IUser, next) {
    const user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {

            if(err) return next();

            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) return next();
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password: string, next: CallableFunction) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        return next(error, isMatch);
    })
}

export default mongoose.model<IUser>('User', userSchema);