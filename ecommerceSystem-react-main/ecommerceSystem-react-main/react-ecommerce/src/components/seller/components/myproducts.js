import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import SNavbar from "./navbar";

function MyProducts({ sid }) {
  const [param] = useSearchParams();
  const [products, setProducts] = useState([]);
  const sellerId = localStorage.getItem("sid");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [sid]);

  const fetchData = () => {
    axios
      .get(`http://localhost:8080/product/seller/${sellerId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleAddProduct = () => {
    console.log("Add product functionality");
    navigate('/seller/addproduct')
  };

  const handleDeleteProduct = (productId) => {
    console.log("Delete product functionality for productId:", productId);

    // Send a DELETE request to your backend API
    axios
      .delete(`http://localhost:8080/product/delete/${productId}/${sellerId}`)
      .then((response) => {
        console.log("Delete response:", response);
        console.log('Product deleted successfully');
        // Update the state to reflect the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <SNavbar />
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="my-4 p-3">
            <h2 className="mb-4">My Products</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Name</th>
                  <th>Product Description</th>
                  <th>Colour</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.colour}</td>
                    <td>{product.size}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteProduct(product.productId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MyProducts;
