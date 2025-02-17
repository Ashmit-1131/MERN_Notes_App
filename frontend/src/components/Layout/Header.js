// Header.js
import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import lightLogo from "../../assets/light_themed_logo.png.webp";
import darkLogo from "../../assets/dark_themed_logo.png.webp";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      expand="lg"
      className={`header ${theme}`}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="header-title"
          style={{ cursor: "pointer" }}
        >
          <img
            src={theme === "light" ? lightLogo : darkLogo}
            alt="Notebook-icon"
            style={{ height: "30px", marginRight: "8px" }}
          />
          <span>Notebook</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/")}>NOTEBOOK</Nav.Link>

            <Button
              onClick={toggleTheme}
              variant="outline-secondary"
              className="ms-3"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>

            {token ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <img
                    src="avatar.png"
                    alt={username || "User"}
                    className="avatar-img"
                  />
                  <span className="userName ms-2">{username}</span>
                </Nav.Item>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/login")}>LOGIN</Nav.Link>
                <Button
                  variant="primary"
                  className="ms-2"
                  onClick={() => navigate("/register")}
                >
                  REGISTER
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
