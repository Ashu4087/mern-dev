import { Link } from 'react-router-dom'

export const Navbar = () =>{
    return(
        <header>
            <div className='container'>
                <Link to='/'>
                    <h2>Workout Buddy</h2>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>SignUp</Link>
                    </div>
                </nav>
            </div>
        </header>
        
    );
}
