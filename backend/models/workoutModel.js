import mongoose from "mongoose"

// create a function used to create schemas
const Schema = mongoose.Schema; 


const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Workout', workoutSchema);