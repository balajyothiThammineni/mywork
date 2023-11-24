
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
// Define the Login component
function Login(){
   // Extract query parameters from the URL
    const [param] = useSearchParams();
    // State variables to manage username, password, and error message
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState(param.get('msg'));
    // Get the navigation function from React Router
    const navigate = useNavigate();
    // Function to handle the login process
    const doLogin=()=>{
      // Encode the username and password in Base64 format for Basic Authentication
      let token = window.btoa(username + ':' + password);
      // Make a POST request to the authentication endpoint
      axios.post('http://localhost:8082/auth/login',{},{
        headers:{
          'Authorization':'Basic '+token
        }
      })
      .then(function (response){
        //handle successful login
        localStorage.setItem('username',username)
        localStorage.setItem('token',token)
        localStorage.setItem('id',response.data.id)
        localStorage.setItem('isLoggedIn',true)
        // Determine user role and navigate to the corresponding dashboard
        let role = response.data.role;

        switch(role){
          case 'CUSTOMER':
            navigate('/customer/dashboard')
            break;
          case 'VENDOR':
            navigate('/vendor/dashboard')
            break;
          case 'EXECUTIVE':
            navigate('/executive/dashboard')
            break;
          default:
        }
      })
      .catch(function (error){
//handle the login error
setMsg('Invalid Credentials')
});
  // if(username === 'harry@gmail.com' && password === 'potter@123'){
  //     localStorage.setItem('isLoggedIn',true);
  //     navigate(localStorage.getItem('url'))
  // }
  // else{
  //     setMsg('Invalid Credentials')
  // }
}
 // Render the Login component
return(
<div className="container mt-4">

<div className="row">
  <div className="col-md-3"></div>
  <div className="col-md-6">
    <div className="card">
      <div className="card-header">
          <h3>Login</h3>
      </div>
      <div className="card-body">
          {msg !== ''?
                <div className="alert alert-danger" role="alert">
                  {msg}
              </div>
          :''} 
          <div className="row " style={{textAlign: "right"}}>
                <div className="col-md-6">
                  <label>Enter Email/Username:</label>
                </div>
                <div className="col-md-6 mb-4">
                  <input type="email" className="form-control" 
                  onChange={(e)=>setUsername(e.target.value)}/>
                </div>
              </div>
              <div className="row" style={{textAlign: "right"}}>
                <div className="col-md-6">
                  <label>Enter Password:</label>
                </div>
                <div className="col-md-6">
                  <input type="password" className="form-control" 
                  onChange={(e)=>setPassword(e.target.value)} />
</div>
              </div>

            </div>
            <div className="card-footer" style={{textAlign: "right"}}>
                <button className="btn btn-primary" 
                onClick={()=>doLogin()}>Login</button>
              </div>
          </div>
          <div style={{textAlign:"left"}} className="mt-4">
            <span>Don't have an account
              <button className="button_link"
                onClick={()=>navigate('/auth/signup')}>Sign up</button>
            </span>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>

  </div>
    )
}
 export default Login;