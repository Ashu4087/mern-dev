import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


// use the static method to hash password
userSchema.statics.signUp = async function (email, password) {
    // validate email and password
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is invalid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is Weak');
    }
    // as the User model is not yet available 'this refers to the model associated with given schema i.e, userSchema
    const exists = await this.findOne({email});
    
    if(exists){
        throw Error('Email already in use');
    }

    // bcrypt adds a random piece of data, called salt, to create a unique hash that is almost
    // myyPasswordEdf345sd
    // myyPasswordo09iDFaa
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await this.create({email, password: hash});
        return user;

    } catch (error) {
        // Handle any errors that occur during the hashing process
        throw Error('Error hashing password:', error); 
    }
}

// static login method

userSchema.statics.login = async function(email, password) {
   
    if(!email || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({email});
    
    if(!user){
        throw Error('Incorrect Email');
    }
    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect Password');
    }

    return user;
}

export default mongoose.model('User', userSchema);