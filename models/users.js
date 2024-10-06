import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) 
            return next(err);
        
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(passwordInput, callback) {
    bcrypt.compare(passwordInput, this.password, (err, isMatch) => {
        if (err)
            return callback(err);
        
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);