import express from 'express';
import { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';

const router = express.Router();

// get all workouts
router.get('/', getWorkouts);

// get a workout
router.get('/:id', getWorkout);

// create new  workout
router.post('/', createWorkout);

// delete a  workout
router.delete('/:id', deleteWorkout);

// update a  workout
router.patch('/:id', updateWorkout);

export default  router;