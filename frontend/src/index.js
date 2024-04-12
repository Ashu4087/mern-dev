import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContextProvider } from './Context/WorkoutContext';
import { AuthContextProvier } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvier>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvier>
  </React.StrictMode>
);