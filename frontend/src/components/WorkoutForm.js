import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";

const WorkoutForm = () =>{
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');

    let count = 5;
    console.log('Render');

    useEffect(()=>{
        console.log( count);
        count = 6;
        console.log('useEff', count);
    }, [title])
    const handleFormSubmit = async(evt) =>{
        evt.preventDefault();

        const workout  = {title, load, reps};
        const payload = {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch('http://localhost:4024/api/workouts', payload);
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setTitle('');
            setReps('');
            setLoad('');
            console.log('added new workout', json);
            dispatch({type: 'CREATE_WORKOUTS', payload: json});
        }

    }


    return(
        <div>
            <h2>{count}</h2>
            <form onSubmit={handleFormSubmit}>
                <h3>Add a new Workout</h3>
                <label>Excercise title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Load (kg)</label>
                <input type="text" value={load} onChange={(e) => setLoad(e.target.value)}/>

                <label>Reps</label>
                <input type="text" value={reps} onChange={(e) => setReps(e.target.value)}/>
                <button type="submit">Add</button>
                {error && <div>{error}</div>}
            </form>

        </div>
    )
}

export default WorkoutForm;