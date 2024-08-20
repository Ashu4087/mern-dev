import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () =>{
    
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutsContext();

    const logout = () =>{
        // remove saved token from local storage
        localStorage.removeItem('user');

        // unset user details
        dispatch({type: 'LOGOUT'});
        workoutDispatch({type:'SET_WORKOUTS', payload:null});
    }

    return {logout};
} 