import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workOutReducer = (state, action) =>{

    switch(action.type){
        case 'SET_WORKOUTS':
            return { workouts: action.payload };

        case 'CREATE_WORKOUTS':
            return { workouts: [action.payload, ...state.workouts] };
        
        case 'DELETE_WORKOUT':
            return { workouts: action.payload._id ? state.workouts.filter(w => w._id !== action.payload._id) : state };
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workOutReducer, { workouts: null } );

    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}