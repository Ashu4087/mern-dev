import express from 'express';
import { staticFileServe } from '../controllers/staticFile.js'

const router = express.Router();

router.get('/', staticFileServe);

export default router;