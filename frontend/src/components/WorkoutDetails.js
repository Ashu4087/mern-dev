import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";

export const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext();

    const detailsStyle = {
        padding: "10px",
        margin: "10px",
        // backgroundColor: "grey",
        border:"1px solid grey",
        // width: "fit-content"
    }

    const dltBtnStyle = {
      backgroundColor: 'grey',
      cursor: 'pointer'
    }

    const handleDelete = async() =>{
        const response = await fetch('http://localhost:4024/api/workouts/'+ workout._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload : json.data});
        }

    }
    return(
        <div style={detailsStyle}>
            <h4>{workout.title}</h4>
            <p><strong>Load (Kg) :{workout.load}</strong></p>
            <p><strong>Reps :{workout.reps}</strong></p>
            <p>Reps :{workout.createdAt}</p>
            <span style={dltBtnStyle} onClick={handleDelete}>delete</span>
        </div>
    )
}