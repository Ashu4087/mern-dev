import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../Hooks/useAuthContext";

export const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const handleDelete = async() =>{
        if(!user) {
            return;
        }
        const response = await fetch('http://localhost:4024/api/workouts/'+ workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload : json.data});
        }

    }

    const numberWithTwoDigits = (input) => {
        let str = String(input)
        return str.padStart(2, '0');
    };
    
    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (Kg): {numberWithTwoDigits(workout.load)}</strong></p>
            <p><strong>Reps: {numberWithTwoDigits(workout.reps)}</strong></p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete}>delete</span>
        </div>
    )
}