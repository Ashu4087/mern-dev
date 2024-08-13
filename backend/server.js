import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workout.js';
import cors from 'cors';
import userRoutes from './routes/user.js';
import staticFile from './routes/static.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


const app =  express();
const port = process.env.PORT | 4000;

//middleware
app.use(express.json());
app.use(logger);
app.use(cors())
//router use below url as base for workout 
app.use('/api/workouts', workoutRoutes);

//router use below url as base for user authentication 
app.use('/api/user', userRoutes);

app.use('/static', staticFile);

// use custom middle ware

function logger(req, res, next){
    console.log('method: ', req.method, ' Url:', req.path);
    next(); 
}

async function serverInit (){
   try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, ()=>{
        console.log("Conneted to Database & Server is listening at:", port);
    });
   } catch (error) {
    console.log(error);
   }
    
}

serverInit();