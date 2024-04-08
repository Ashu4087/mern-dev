import { Link } from 'react-router-dom'

export const Navbar = () =>{
    return(
        <div>
            <Link to='/'>
                <h2>Workout Buddy</h2>
            </Link>
        </div>
    );
}
