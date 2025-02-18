import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (token && email) {
      setUser({ email, token });
    }
  }, []);

  const login = async (formData, enqueueSnackbar) => {
    try {
      const res = await axios.post(`${config.endpoint}/auth/login`, formData);
      
    
      if (res.data.token && res.data.user) {
        enqueueSnackbar("Login successful!", { variant: "success" });
        
      
        const { token, user: userData } = res.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", userData.email);
   
        sessionStorage.setItem("name", userData.name);
        
        setUser({ email: userData.email, token });
        navigate("/");
      } else {
        enqueueSnackbar("Invalid login response!", { variant: "error" });
      }
    } catch (e) {
      console.error("Login Error:", e);
      if (e.response) {
        console.error("Server Response:", e.response.data);
        enqueueSnackbar(e.response.data.message || "Authentication failed!", { variant: "error" });
      } else if (e.request) {
        console.error("No response received:", e.request);
        enqueueSnackbar("Server is not responding. Please try again later.", { variant: "warning" });
      } else {
        console.error("Unexpected Error:", e.message);
        enqueueSnackbar("An unexpected error occurred. Please try again.", { variant: "error" });
      }
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
