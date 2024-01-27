import React from "react";
import CNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; 

function OrderSuccess() {
  const navigate = useNavigate();
  function handleBackToHome(){
    navigate("/customer/dashboard");
  }

  return (
    <div>
      <CNavbar />
    <div className="container text-center" style={{ marginTop: '100px' }}>
      <h1 className="text-success">Order Successfully Placed!</h1>
      <FaCheckCircle style={{ color: "green", fontSize: "3em" }} />
      <p className="lead">Thank you for shopping with us. Your order has been successfully placed.</p>
      <p>Your order will be processed shortly, and you will receive a confirmation email.</p>
      <button className="btn btn-primary" onClick={() => handleBackToHome()}>Back to Home Page</button>
    </div>
    </div>
  );

}

export default OrderSuccess;
