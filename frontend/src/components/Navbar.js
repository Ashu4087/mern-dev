import { Link } from 'react-router-dom';
import { useLogout } from '../Hooks/useLogout';

export const Navbar = () =>{
    const { logout } = useLogout();
    
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
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>SignUp</Link>
                    </div>
                </nav>
            </div>
        </header>
        
    );
}
