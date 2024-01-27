import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import SNavbar from "../seller/components/navbar";

function Register() {

  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [hno, setHno] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [sellerNumber, setSellerNumber] = useState("");
  const [setSeller, setSetSeller] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const doSignUp = () => {
    if (
      !sellerName ||
      !sellerEmail ||
      !password ||
      !gstin ||
      !username ||
      !hno ||
      !street ||
      !city ||
      !pin ||
      !state ||
      !sellerNumber
    ) {
      setMsg("All fields are required");
      return;
    }

    let sellerObj = {
      sellerName: sellerName,
      email: sellerEmail,
      password: password,
      number: sellerNumber,
      gstin: gstin,
      user: {
        username: username,
        password: password,
      },
      address: {
        hno: hno,
        street: street,
        city: city,
        pinCode: pin,
        state: state,
      },
    };

    console.log(JSON.stringify(sellerObj));

    axios
      .post("http://localhost:8080/seller/signup", sellerObj)
      .then((response) => {
        setSetSeller(response.data);
        navigate('/auth/login?msg="signup success"');
      })
      .catch(function (error) {
        setMsg("Issue in processing signup..");
      });
  };

  return (
    <div>
      <SNavbar />
      <Container fluid className="mt-5">
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
                        onChange={(e) => setSellerName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Enter Contact No:</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setSellerNumber(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setSellerEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label>GSTIN:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setGstin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label>House No:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setHno(e.target.value)}
                      />
                    </div>
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
                      <label>Enter State:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setState(e.target.value)}
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
                  </div>
                  <div className="col-md-12">
                    <div className="mb-4">
                      <label>Enter Email/Username:</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-4">
                      <label>Enter Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={() => doSignUp()}>
                  SignUp
                </button>
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-4">
              <span>
                Have an Account?
                <button
                  className="button_link"
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

export default Register;