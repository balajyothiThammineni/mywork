import React from "react";
import CNavbar from "./navbar";

function Contact()
{
  return (
    <div className="container mt-5 pt-5">
      <div className="card">
        <div className="card-header" style={{ background: '#007BFF', color: '#fff' }}>
          <h3 className="mb-0">Contact Us</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4>Contact Information</h4>
              <p>Email: <a href="mailto:tbalajyothi17@gmail.com">tbalajyothi17@gmail.com</a></p>
              <p>Phone: +123456789</p>
              <p>Address: 123 Street, City, Country</p>
            </div>
            <div className="col-md-6">
              <h4>Send us a Message</h4>
              <form>
                {/* Your form fields go here */}
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea className="form-control" id="message" rows="4"></textarea>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <CNavbar />
    </div>
  );
}
export default Contact;