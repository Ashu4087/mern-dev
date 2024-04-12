import { useEffect } from 'react';
import  WorkoutForm  from '../components/WorkoutForm.js';
import { WorkoutDetails } from '../components/WorkoutDetails.js';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext.js';

export const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext();
    
    console.log("Render", workouts);

    useEffect(()=>{
        console.log("Use Effect");

        const fetchWorkouts = async() =>{
            const response = await fetch('http://localhost:4024/api/workouts');
            const json = await response.json();
            if(response.ok){
                dispatch({type : 'SET_WORKOUTS', payload : json.data});
            }
        }
        fetchWorkouts();
    }, [dispatch]);

    return(
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts?.map((w)=>(
                    <WorkoutDetails workout={w}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    );
}
