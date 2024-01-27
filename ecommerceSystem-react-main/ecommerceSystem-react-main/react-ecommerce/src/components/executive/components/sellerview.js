import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import ENavbar from "./navbar";

function Sellerview() {
  const [param] = useSearchParams();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8080/seller/view/all')
      .then(response => setSellers(response.data))
      .catch(error => console.error('Error fetching sellers:', error));
  };

  const handleDeleteClick = (sellerId) => {
    if (sellerId === undefined || sellerId === null) {
      console.error('Seller ID is undefined or null');
      return;
    }

    console.log(`Delete button clicked for seller with ID: ${sellerId}`);

    axios.delete(`http://localhost:8080/seller/delete/${sellerId}`)
      .then(response => {
        console.log('Delete response:', response);
        console.log('Seller deleted successfully');
        setSellers(prevSellers => prevSellers.filter(seller => seller.sellerId !== sellerId));
      })
      .catch(error => console.error('Error deleting seller:', error));
  };

  return (
    <div>
      <ENavbar />
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="my-4 p-3">
            <h2 className="mb-4">All Sellers</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => (
                  <tr key={seller.sellerId}>
                    <td>{index + 1}</td>
                    <td>{seller.sellerName}</td>
                    <td>{seller.email}</td>
                    <td>{seller.number}</td>
                    <td>{`${seller.address.hno}, ${seller.address.street}, ${seller.address.city}, ${seller.address.state}`}</td>
                    {/* <td><button class="btn btn-warning" onClick={() => removeSeller(index)}>Remove</button></td> */}

                     <td>
                      <Button variant="danger" onClick={() => handleDeleteClick(seller.sellerId)}>Delete</Button>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Sellerview;
