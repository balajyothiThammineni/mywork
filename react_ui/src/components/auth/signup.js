// Import necessary modules from external libraries
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
// Define the Signup component
function Signup() {
    // State variables to manage form input values and messages
    const [name,setName] = useState('');
    const [contact,setContact] = useState('');
    const [hno,setHno] = useState(''); 
    const [street,setStreet] = useState(''); 
    const [city,setCity] = useState(''); 
    const [pin,setPin] = useState(''); 
    const [state,setState] = useState('');    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [setCustomer, setSetCustomer] = useState('');
    const [msg,setMsg] = useState('');
    const navigate = useNavigate();
    // Function to handle the signup process
    const doSignUp=()=>{
 // Create a customer object with the form input values
        let customerObj ={
            "name":name,
            "contact":contact,
            "email":username,
            "address":{
                "hno":hno,
                "street":street,
                "city":city,
                "pinCode":pin,
                "state":state
            },"user":{
                "username":username,
                "password":password  
                }
        }
         // Log the customer object in JSON format to the console
        console.log(JSON.stringify(customerObj))
         // Make a POST request to the server to add the customer's address
        axios.post('http://localhost:8082/customer/address/add',customerObj)
            .then(response=>{
                // Set the customer data and navigate to the login page with a success message
                setCustomer(response.data)
                navigate('/auth/login?msg="signup success"')
            })
            .catch(function(error){
                setMsg("Issue in processing signup..")
            });

    }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>MyApp</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                {msg !== "" ? (
                  <div class="alert alert-danger" role="alert">
                    {msg}
                  </div>
                ) : (
                  ""
                )}
                <div className="row " style={{ textAlign: "right" }}>
                    
                  {/* Read Name */}
                  <div className="col-md-6">
                    <label>Enter Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Read Contact */}
                  <div className="col-md-6">
                    <label>Enter Contact No:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  
                  {/* Read Hno */}
                  <div className="col-md-6">
                    <label>Enter House No:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setHno(e.target.value)}
                    />
                  </div>

                    {/* Read street */}
                  <div className="col-md-6">
                    <label>Enter Street Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>

                    {/* Read city */}
                  <div className="col-md-6">
                    <label>Enter City Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                    {/* Read pin */}
                  <div className="col-md-6">
                    <label>Enter Pin Code:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                   {/* Read state */}
                   <div className="col-md-6">
                    <label>Enter State:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <hr />
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
                </div>
                <div className="row" style={{ textAlign: "right" }}>
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
      </div>
    </div>
  );
}

export default Signup;