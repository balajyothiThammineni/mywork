import React from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ENavbar() {
  const navigate = useNavigate();

  const navBrandStyle = {
    color: '#4A55A2',
    fontFamily: 'Poppins',
    letterSpacing: '2px',
    marginLeft: '1cm',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const navLinkStyle = {
    color: '#4A55A2',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
      <Navbar.Brand href="/home" className="brand fw-bold" style={navBrandStyle}>
        Executive Dashboard
      </Navbar.Brand>

      <div className="ms-auto d-flex gap-2">
        <Navbar.Brand onClick={() => navigate('/home')} style={navLinkStyle}>Home </Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/addcategory')} style={navLinkStyle}>Add Category </Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/Sellerview')} style={navLinkStyle}>All Sellers </Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/CustomerView')} style={navLinkStyle}>View Customers </Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/auth/logout')} style={navLinkStyle}>Logout </Navbar.Brand>
      </div>
    </nav>
  );
}

export default ENavbar;
