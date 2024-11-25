import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './tailwind.css';
import { AuthContextProvider } from './context/authContext'; // Import AuthContextProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the App with AuthContextProvider */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
);
