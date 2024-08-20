import { useEffect } from 'react';
import  WorkoutForm  from '../components/WorkoutForm.js';
import { WorkoutDetails } from '../components/WorkoutDetails.js';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext.js';
import { useAuthContext } from '../Hooks/useAuthContext.js';

export const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext();
    const { user } = useAuthContext();

    console.log("Render", workouts);

    useEffect(()=>{
        console.log("Use Effect");

        const fetchWorkouts = async() =>{
            const response = await fetch('http://localhost:4024/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok){
                dispatch({type : 'SET_WORKOUTS', payload : json.data});
            }
        }

        if(user) {
            fetchWorkouts();
        }

        
    }, [dispatch, user]);

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
