import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import SNavbar from "./navbar"; // Assuming you have a navbar for sellers

function UpdateDetails() {
  const [sellerDetails, setSellerDetails] = useState({
    sellerName: "",
    email: "",
    number: "",
    gstin: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const sellerId = localStorage.getItem('sid');
  useEffect(() => {
    // Fetch the seller details from the server using the sellerId
    axios
      .get(`http://localhost:8080/seller/getone/${sellerId}`)
      .then((response) => {
        setSellerDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seller details:", error);
      });
  }, [sellerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/seller/update/${sellerId}`, sellerDetails);

      if (response.status === 200) {
        setMsg("Seller details updated successfully");
        // Optionally, you can redirect the user or perform additional actions after a successful update
      } else {
        setMsg("Failed to update seller details");
      }
    } catch (error) {
      console.error("Error updating seller details:", error);
      setMsg("Issue in processing update");
    }
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
                <h4>Update Details</h4>
              </div>
              <div className="card-body">
                {msg !== "" && (
                  <div className="alert alert-info" role="alert">
                    {msg}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="update-details-form">
                  <div className="mb-4">
                    <label>Seller Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sellerDetails.sellerName}
                      onChange={handleInputChange}
                      name="sellerName"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sellerDetails.email}
                      onChange={handleInputChange}
                      name="email"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sellerDetails.number}
                      onChange={handleInputChange}
                      name="number"
                    />
                  </div>
                  <div className="mb-4">
                    <label>GSTIN:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sellerDetails.gstin}
                      onChange={handleInputChange}
                      name="gstin"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Details
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Container>
    </div>
  );
}

export default UpdateDetails;
