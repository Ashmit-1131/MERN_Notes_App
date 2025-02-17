import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';

import NoteBook from './components/Notes/NoteBook';
import { ThemeProvider } from './context/ThemeContext';


const App = () => {
  return (
    <div className="container text-center mt-5">
    
    <AuthProvider>
      <ThemeProvider>
      <Routes>
          <Route path="/" element={<NoteBook/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>
      </ThemeProvider>
  
     
    </AuthProvider>
  
   

    </div>
  );
};

export default App;
