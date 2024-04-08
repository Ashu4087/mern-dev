import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home.js';
import { Navbar } from './components/Navbar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          path='/'
          element={<Home/>}
          />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
