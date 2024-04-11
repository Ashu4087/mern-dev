import express from 'express';
import {login, signup} from '../controllers/userController.js'

const router = express.Router();

// login route
router.post('/login', login);

// signup route
router.post('/signup', signup);

export default router;