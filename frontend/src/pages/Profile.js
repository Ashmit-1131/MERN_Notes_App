import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { config } from "../utils/api";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", userId: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${config.endpoint}/user/profile`, {
          headers: { Authorization: token },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
          userId: response.data._id,
        });
      } catch (error) {
        setError("Error fetching user details. Please try again.");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${config.endpoint}/user/profile/update`,
        { name: user.name, email: user.email },
        { headers: { Authorization: token } }
      );
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (error) {
      setError("Error updating profile. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center mt-4">
        <Card style={{ width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h3 className="text-center mb-3">User Profile</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {loading ? (
            <Spinner animation="border" className="d-block mx-auto mt-3" />
          ) : (
            <Form onSubmit={handleUpdate} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={user.userId} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={user.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Form>
          )}
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
