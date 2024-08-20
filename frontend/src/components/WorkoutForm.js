import { useState } from "react";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const WorkoutForm = () =>{
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();

    const handleFormSubmit = async(evt) =>{
        evt.preventDefault();
        if(!user) {
            setError('You must be logged in');
            return
        }
        const workout  = {title, load, reps};
        const payload = {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }
        const response = await fetch('http://localhost:4024/api/workouts', payload);
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setEmptyFields([]);
            setTitle('');
            setReps('');
            setLoad('');
            console.log('added new workout', json);
            dispatch({type: 'CREATE_WORKOUTS', payload: json});
        }

    }


    return(
        
        <form className="create" onSubmit={handleFormSubmit}>
            <h3>Add a new Workout</h3>
            
            <label>Excercise title</label>
            <input type="text" value={title} className={emptyFields.includes('title')? 'error' : ''} onChange={(e) => setTitle(e.target.value)}/>
            
            <label>Load (kg)</label>
            <input type="text" value={load} className={emptyFields.includes('load')? 'error' : ''} onChange={(e) => setLoad(e.target.value)}/>

            <label>Reps</label>
            <input type="text" value={reps}  className={emptyFields.includes('reps')? 'error' : ''}onChange={(e) => setReps(e.target.value)}/>
            
            <button type="submit">Add</button>
            {error && <div>{error}</div>}
        </form>

    )
}

export default WorkoutForm;