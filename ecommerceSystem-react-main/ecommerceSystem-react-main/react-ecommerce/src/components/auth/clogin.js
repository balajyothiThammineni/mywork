import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import CNavbar from "../customer/components/navbar";

function Clogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const doLogin = () => {
    let token = window.btoa(username + ':' + password);
    axios.post('http://localhost:8080/auth/login', {}, {
      headers: {
        'Authorization': 'Basic ' + token
      }
    })
      .then(function (response) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('isLoggedIn', true);

        let role = response.data.role;

        switch (role) {
          case 'CUSTOMER':
            navigate('/customer/dashboard');
            break;
          // Add additional cases for other user types if needed
          default:
            setMsg('Invalid user type');
        }
      })
      .catch(function (error) {
        setMsg('Invalid Credentials');
      });
  };

  return (
    <div>
      <CNavbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header" style={{ textAlign: "center" }}>
                <h3>Login</h3>
              </div>
              <div className="card-body">
                {msg !== '' ?
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                  : ''}
                <div className="row " style={{ textAlign: "center" }}>
                  <div className="col-md-6">
                    <label>Enter Email/Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="email" className="form-control"
                      onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className="row" style={{ textAlign: "center" }}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="password" className="form-control"
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary"
                  onClick={() => doLogin()}>Login</button>
              </div>
            </div>
            <div style={{ textAlign: "center" }} className="mt-4">
              <span>Don't have an account
                <button className="button_link"
                  onClick={() => navigate('/auth/signup')}>Sign up</button>
              </span>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Clogin;
