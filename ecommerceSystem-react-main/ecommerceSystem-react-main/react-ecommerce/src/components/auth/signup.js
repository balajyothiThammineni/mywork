import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import CNavbar from "../customer/components/navbar";

function SignUp() {
  const [customerName, setcustomerName] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerNumber, setcustomerNumber] = useState("");
  const [hno, setHno] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [setCustomer, setSetCustomer] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const doSignUp = () => {
    // Validate required fields
    if (!customerName || !customerNumber || !customerEmail || !hno || !street || !city || !pin || !state || !username || !password) {
      setMsg("All fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setMsg("Invalid email address");
      return;
    }

    // Validate password format (at least one uppercase, one lowercase, one digit, and minimum length)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMsg("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long");
      return;
    }

    // Other validations can be added here

    let customerObj = {
      customerName: customerName,
      customerEmail: customerEmail,
      customerNumber: customerNumber,
      address: {
        hno: hno,
        street: street,
        city: city,
        pinCode: pin,
        state: state,
      },
      user: {
        username: username,
        password: password,
      },
    };

    axios
      .post("http://localhost:8080/customer/signup", customerObj)
      .then((response) => {
        setSetCustomer(response.data);
        navigate('/auth/login?msg="signup success"');
      })
      .catch(function (error) {
        setMsg("Issue in processing signup..");
      });
  };
  return (
    <div>
      <CNavbar />
      <Container fluid className="mt-5" style={{padding:'100px'}}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header" style={{ textAlign: "center" }}>
                <h4>Sign Up</h4>
              </div>
              <div className="card-body">
                {msg !== "" ? (
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                ) : (
                  ""
                )}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label>Enter Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setcustomerName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Enter Contact No:</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setcustomerNumber(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setcustomerEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>House No:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setHno(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label>Street:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Enter City Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Enter Pin Code:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPin(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Enter State:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row" style={{ textAlign: "left" }}>
                  <div className="col-md-6">
                    <label>Enter Email/Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="row" style={{ textAlign: "left" }}></div>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: "right" }}>
                <button className="btn btn-primary" onClick={() => doSignUp()}>
                  Register
                </button>
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-4">
              <span>
                Have an Account?
                <button
                  className="btn btn-success button_link"
                  style={{ margin: '10px' }}
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
