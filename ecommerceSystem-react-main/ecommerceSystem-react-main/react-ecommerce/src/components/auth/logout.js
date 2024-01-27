import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import MyNavbar from "../navbar";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Clear local storage ID
    localStorage.setItem('isLoggedIn', false) 
    localStorage.removeItem('id');
    localStorage.removeItem('userType');
    localStorage.removeItem('cart')
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    navigate('/home');
  };

  return (
    <div>
      <MyNavbar />

      <Container className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>

        <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Logout Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You have been logged out successfully.</p>
            <p>Please log in again to continue.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseLogoutModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Logout;
