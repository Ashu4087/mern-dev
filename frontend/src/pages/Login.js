import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

export const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, error, login } = useLogin();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await login(email, password)
        console.log(email, password);
    }
    return(
        <form onSubmit={handleSubmit}>
            <h3>Log in</h3>

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
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}

        </form>
    );
}
