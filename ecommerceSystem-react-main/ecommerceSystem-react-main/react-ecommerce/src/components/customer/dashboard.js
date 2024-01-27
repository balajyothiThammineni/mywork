import React, { useState, useEffect } from 'react';
import CNavbar from "./components/navbar";
import { useSearchParams } from "react-router-dom";
import Sidebar from './components/sidebar'; 
import CustomerHome from './components/home';
import Products from './components/products';
function CustomerDashboard() {
    const [qStr,setQstr] = useState('')
    const [param] = useSearchParams();
    const imageUrl = "https://blog.shipperhq.com/wp-content/uploads/2020/01/39.jpeg";
        if(param.get('page') === 'products'){

            return <div>
                <Products />
            </div>
        }

  return (
    <div>
      <CNavbar />

      <div className="container-fluid" 
      style={{
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />

          </div>
          <div className="col-md-9">

            <div>
              <CustomerHome />
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}


export default CustomerDashboard;
