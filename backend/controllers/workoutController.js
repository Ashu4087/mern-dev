import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// get all workouts
export const getWorkouts = async(req,res) =>{
   
    // add to db
    try {
        // create a document (record) using Model(Workout)
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json({data:workouts});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// get a workout
export const getWorkout = async(req,res) =>{
   
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Not a valid id'});

    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: 'No such workout'});

    }

    return res.status(200).json(workout);

}

// create new  workout
export const createWorkout = async(req,res) =>{
    const {title, load, reps} = req.body ;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length >0){
        console.log(emptyFields);
        return res.status(400).json({error : 'Please fill all the fields ', emptyFields});
    }
    // add to db
    try {
        // create a document (record) using Model(Workout)
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a  workout
export const deleteWorkout = async(req,res) =>{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});

    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({error: 'No such workout'});

    }

    return res.status(200).json({data: workout, message: 'successfully delete the workout'});
    
}

// update a  workout
export const updateWorkout = async(req,res) =>{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
 
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});

    if(!workout){
        return res.status(400).json({error: 'No such workout'});

    }

    return res.status(200).json({data: workout, message: 'successfully updated the workout'});
    
}