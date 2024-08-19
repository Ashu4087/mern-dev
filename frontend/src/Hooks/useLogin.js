import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () =>{

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:4024/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            }
        );

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        } 
        if(response.ok){
            // save token to local storage
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(null);

        }
    }

    return {isLoading, error, login};
}
