import userModel from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';

export const requireAuth = async (req, res, next) =>{
    const { authorization } = req.headers; 
    if(!authorization) {
        return res.status(400).json("Authorization required");
    }

    const token = authorization.split(" ")[1];
    try{
        const {_id} =  jwt.verify(token, process.env.SECRET)
        req.user = await userModel.findOne({_id}).select("_id");
        next();

    } catch(e) {
        return res.status(401).json("Request is not Authorized");

    }

}