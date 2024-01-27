import React, { useState,useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CNavbar() {
  const [qStr, setQStr] = useState("");
  const [customerId, setCustomerId] = useState('')
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    // Fetch orders for the specified customer ID
    const fetchOrders = async () => {
      try {

        axios
        .get(`http://localhost:8080/customer/getByUserId/${userId}`)
        .then(async (resp) => {
          setCustomerId(resp.data.customerId);
          
        })
        .catch((error) => {
          console.error("Error fetching seller:", error);
        });


        
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);


  const func = (str) => {
    navigate("/customer/home?page=search&qStr=" + str);
  };

  const navBrandStyle = {
    // fontFamily: "Poppins",
    fontFamily: 'sans-serif',
    letterSpacing: "2px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff", 
  };

  const navLinkStyle = {
    fontFamily: 'sans-serif',
    color: "#fff", 
    fontSize: "1rem",
    // fontWeight: "bold",
    marginRight: "20px", 
    textDecoration: "none", 
    cursor: "pointer",
    transition: "color 0.3s ease", 
  };

  const searchFormStyle = {
    display: "flex",
    alignItems: "center",
  };

  const searchInputStyle = {
    marginRight: "10px", 
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="md"
      fixed="top"
      className="px-sm-2 shadow py-2"
    >
      <Container fluid>
        <Navbar.Brand
          href="/customer/dashboard"
          className="brand fw-bold"
          style={navBrandStyle}
        >
          Customer Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarTogglerDemo02" />

        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="ms-auto" style={{ fontFamily: "Poppins" }}>
            <Nav.Link onClick={() => navigate("/home")} style={navLinkStyle}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/customer/contact")}
              style={navLinkStyle}
            >
              Contact
            </Nav.Link>
            
            {localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userType') === 'CUSTOMER' && (
              <Nav.Link
                onClick={() => navigate("/customer/cart")}
                style={navLinkStyle}
              >
                Cart
              </Nav.Link>
            )}

            {localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userType') === 'CUSTOMER' && (
              <Nav.Link
                onClick={() => navigate("/customer/myreviews/" + customerId)}
                style={navLinkStyle}
              >
                My Reviews
              </Nav.Link>
            )}

            {localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userType') === 'CUSTOMER' &&  (
              <Nav.Link
                onClick={() => navigate("/customer/orders/" + customerId)}
                style={navLinkStyle}
              >
                Orders
              </Nav.Link>
            )}

            {localStorage.getItem('isLoggedIn') !== 'true' && (
            <Nav.Link
              onClick={() => navigate("/auth/Signup")}
              style={navLinkStyle}
            >
              Signup
            </Nav.Link>
            )}

            {localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userType') === 'CUSTOMER' && (
            <Nav.Link
              onClick={() => navigate("/auth/logout")}
              style={navLinkStyle}
            >
              Logout
            </Nav.Link>
            )}
            
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                func(qStr);
              }}
              style={searchFormStyle}
            >
              <Row>
                <Col xs="auto" style={searchInputStyle}>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setQStr(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" variant="outline-light">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CNavbar;
