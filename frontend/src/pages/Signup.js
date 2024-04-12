import { useState } from "react";
import { useSignup } from "../Hooks/useSignup";

export const Signup = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, error, sugnUp} = useSignup();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await sugnUp(email, password);


        console.log(email, password);

    }
    return(
        <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>
                Email :
            </label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label >
                Password :
            </label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
