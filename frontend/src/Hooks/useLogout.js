import { useAuthContext } from "./useAuthContext";

export const useLogout = () =>{
    
    const { dispatch } = useAuthContext();

    const logout = () =>{
        // remove saved token from local storage
        localStorage.removeItem('user');

        // unset user details
        dispatch({type: 'LOGOUT'});
    }

    return {logout};
} 