import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () =>{

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const sugnUp = async (email, password) =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:4024/api/user/signup', {
                method: 'POST',
                headers: {'Content-type': '/json'},
                body: JSON.stringify({email, password})
            }
        );

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        } 
        if(response.ok){
            dispatch({type: 'LOGIN', payload: json});
            // save token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            setIsLoading(null);

        }
    }

    return {isLoading, error, sugnUp};
}
