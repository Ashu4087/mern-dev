import express from 'express';
import { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// middleware to authenticate

router.use(requireAuth);

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