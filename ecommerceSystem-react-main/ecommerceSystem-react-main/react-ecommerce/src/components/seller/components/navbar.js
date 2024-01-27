import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" variant="light" bg="info" style={{ backgroundColor: '#007BFF', borderBottom: '1px solid #0056b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
      <Navbar.Brand href="/home" className="brand fw-bold" style={{ color: 'white', fontFamily: 'sans-serif', letterSpacing: '2px', fontSize: '1.8rem' }}>
        Seller Dashboard
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />

      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto" style={{ gap: '20px' }}>
          <Nav.Link onClick={() => navigate('/home')} style={{ color: 'white', fontSize: '1.2rem' }}>Home</Nav.Link>
          {localStorage.getItem('isLoggedIn') !== 'true' && (
            <>
              <Nav.Link onClick={() => navigate('/auth/register')} style={{ color: 'white', fontSize: '1.2rem' }}>Register</Nav.Link>
              <Nav.Link onClick={() => navigate('/auth/login')} style={{ color: 'white', fontSize: '1.2rem' }}>Login</Nav.Link>
            </>
          )}
          {localStorage.getItem('isLoggedIn') === 'true' && (
            <>
              <Nav.Link onClick={() => navigate('/seller/myproducts')} style={{ color: 'white', fontSize: '1.2rem' }}>My Products</Nav.Link>
              <Nav.Link onClick={() => navigate('/seller/updatedetails')} style={{ color: 'white', fontSize: '1.2rem' }}>Update Details</Nav.Link>
              <Nav.Link onClick={() => navigate('/auth/logout')} style={{ color: 'white', fontSize: '1.2rem' }}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SNavbar;
