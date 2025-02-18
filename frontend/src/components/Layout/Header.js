import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import lightLogo from "../../assets/light_themed_logo.png.webp";
import darkLogo from "../../assets/dark_themed_logo.png.webp";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      variant={theme === "light" ? "light" : "dark"}
      expand="lg"
      fixed="top"               // <-- This fixes the Navbar to the top
      className={`header ${theme}`}
    >
      <Container fluid>         {/* Makes the header take full width */}
        <Navbar.Brand
          onClick={() => navigate("/")}
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
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="outline-secondary" id="profile-dropdown">
                  <span className="userName ms-2">{name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
