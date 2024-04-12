import User from '../models/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


// create jwt token
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


// login user
export const login = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token});

    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// signup user
//for security purpose of db we can store passeord in hashed string
//to do so we can handle it in signup controller or mongoose provide some
// static method to do so
export const signup = async function (req, res) {
    const {email, password} = req.body;

    try{
        const user = await User.signUp(email, password);
        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token});

    } catch(error){
        res.status(400).json({error: error.message});
    }
    // res.json({msg : 'signup user'});
}