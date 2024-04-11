import User from '../models/userModel.js';
import mongoose from 'mongoose';

// login user
export const login = async(req, res) => {
    res.json({msg : 'login user'});
}

// signup user
//for security purpose of db we can store passeord in hashed string
//to do so we can handle it in signup controller or mongoose provide some
// static method to do so
export const signup = async function (req, res) {

    const {email, password} = req.body;

    try{
        console.log("email, pass", email, password);
        const user = await User.signUp(email, password);
        res.status(200).json({email, user});

    } catch(error){
        res.status(400).json({error: error.message});
    }
    // res.json({msg : 'signup user'});
}