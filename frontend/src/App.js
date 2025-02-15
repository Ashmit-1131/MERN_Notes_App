import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="container text-center mt-5">
    {/* <Register/> */}
    <AuthProvider>
    <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
  
    </AuthProvider>
   

    </div>
  );
};

export default App;
