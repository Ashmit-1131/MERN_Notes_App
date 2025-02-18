import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext"; // adjust the path if needed
import "./Footer.css";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      variant={theme === "light" ? "light" : "dark"}
      fixed="bottom"
      className={`footer ${theme}`}
    >
      <Container fluid className="justify-content-center">
        <div className="footer-content text-center">
          <p className="footer-quote mb-0">
            ✨ "Every great story begins with a single word. Write your journey, one page at a time." ✨
          </p>
          <p className="footer-message mb-0">
            Start journaling today and turn your thoughts into memories. 🚀
          </p>
          <p className="footer-ownership mb-0">
            © 2025 beingashmit@gmail.com
          </p>
        </div>
      </Container>
    </Navbar>
  );
};

export default Footer;
