import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  const navbarStyle = {
    background: '#e3f2fd',  // Match the background color of the first navbar
    borderBottom: '1px solid #dee2e6',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '8px 16px',
  };

  const brandStyle = {
    color: '#4A55A2',  // Match the color of the first navbar's brand
    letterSpacing: '2px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const navLinkStyle = {
    color: '#4A55A2',  // Match the color of the first navbar's links
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginRight: '15px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    padding: '8px 12px',
    borderRadius: '4px',
  };

  return (
    <Navbar bg="light" variant="light" expand="md" fixed="top" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/home" className="brand fw-bold" style={brandStyle}>
          EPIC PICS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarTogglerDemo02" />

        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="ms-auto" style={{ fontFamily: 'Poppins' }}>
            <Nav.Link onClick={() => navigate('/home')} style={navLinkStyle}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/customer/dashboard')} style={navLinkStyle}>Customer</Nav.Link>
            <Nav.Link onClick={() => navigate('/seller/Home')} style={navLinkStyle}>Seller</Nav.Link>
            <Nav.Link onClick={() => navigate('/auth/login')} style={navLinkStyle}>Executive</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
