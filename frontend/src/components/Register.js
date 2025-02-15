import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Register.css"; 

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateInput(formData)) return;
    try {
      await axios.post(`http://localhost:8081/auth/register`, formData);
      enqueueSnackbar("Registered successfully", { variant: "success" });
      navigate("/login");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Registration failed", { variant: "error" });
    }
  };

  const validateInput = ({ name, email, password }) => {
    if (!name) {
      enqueueSnackbar("Name is required", { variant: "warning" });
      return false;
    } else if (!email) {
      enqueueSnackbar("Email is required", { variant: "warning" });
      return false;
    } else if (!password || password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <div className="register-page">
      
      <div className="register-container">
        <div className="register-form">
          <h2 className="register-title">Create Your Notebook Account</h2>
          <form onSubmit={register}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="register-button">Register Now</button>
          </form>
          <p className="register-footer">
            Already have an account? <Link to="/login" className="register-link">Login here</Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
