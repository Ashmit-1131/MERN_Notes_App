import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useSnackbar } from "notistack"; // Import Snackbar
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar(); // Initialize Snackbar

  const validateInput = ({ email, password }) => {
    if (!email) {
      enqueueSnackbar("Email is required", { variant: "warning" });
      return false;
    }
    if (!password || password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters long", { variant: "warning" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const formData = { email, password };
    if (validateInput(formData)) {
      login(formData, enqueueSnackbar); 
    }
  };

  return (
    <div className="page-container">

      <Header />


      <div className="content">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4 shadow-lg login-card">
            <h2 className="text-center text-success">Login</h2>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleSubmit}>
              Login
            </button>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>

    
      <Footer />
    </div>
  );
};

export default Login;
