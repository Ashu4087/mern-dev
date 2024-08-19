import { Link } from 'react-router-dom';
import { useLogout } from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';

export const Navbar = () =>{
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    const handleLogout = () =>{
        logout();
    }
    return(
        <header>
            <div className='container'>
                <Link to='/'>
                    <h2>Workout Buddy</h2>
                </Link>
                <nav>
                    { user && (
                        <div>
                            <span>{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>

                        </div>
                    )}
                    { !user && 
                        <div>
                            <Link to='/login'>Login</Link>
                            <span>/</span>
                            <Link to='/signup'>SignUp</Link>
                        </div>
                    }
                </nav>
            </div>
        </header>
        
    );
}
