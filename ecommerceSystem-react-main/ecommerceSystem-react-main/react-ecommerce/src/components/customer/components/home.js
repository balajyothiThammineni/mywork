import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import CNavbar from "./navbar";

function CustomerHome(props) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const navigate = useNavigate();
  const [param] = useSearchParams();

  useEffect(() => {
    if (param.get('page') === 'search') {
      const props = param.get('qStr');
      if (props !== null) {
        axios.get('http://localhost:8080/search/' + props)
          .then(response => setSearchProducts(response.data))
          .catch(error => console.error('Error in Fetching Search Products:', error));
      }
    } else {
      setSearchProducts([]);
    }

    axios.get('http://localhost:8080/featured/all')
      .then(response => setFeaturedProducts(response.data))
      .catch(error => console.error('Error in Fetching Featured Products:', error));
  }, [props.strVal]);

  const handleAddToCart = (product) => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      // If customer is not logged in, store the intended cart URL and redirect to login/signup
      alert('Please login first before proceeding to your cart')
      localStorage.setItem('url', '/customer/cart');
      navigate('/auth/login'); // or navigate('/auth/signup') based on your requirement
    } else {
      // If customer is logged in, add product to cart and navigate to cart page
      let cartValues = [];
      let localCartData = localStorage.getItem('cart');
      if (localCartData) {
        cartValues = JSON.parse(localCartData);
      }
      cartValues.push(product);
      localStorage.setItem('cart', JSON.stringify(cartValues));

      navigate('/customer/cart');
    }
  };

  return (
    <div>
      <CNavbar />
      {featuredProducts && featuredProducts.length > 0 && (
      <div style={{ opacity: 0.8 }}> 
        <Card>
          <Row>
            {searchProducts.map((p, index) => (
              <Col key={index} md={4} className="mb-4">
                {/* Render search products */}
              </Col>
            ))}
          </Row>
        </Card>

        <Card style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto', marginTop: '120px' }}>
  <Row>
    {featuredProducts.map((p) => (
      <Col key={p.productId} md={12} style={{ marginBottom: '20px' }}>
        <Card style={{ display: 'grid', gridTemplateColumns: '30% 70%' }}>
          <img src={p.imageData} alt={p.name} style={{ width: '100%', objectFit: 'cover' }} />
          <CardBody>
            <CardTitle tag="h5">{p.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Price: Rs. {p.price}
            </CardSubtitle>
            <CardText>Colour: {p.colour}</CardText>
            <CardText>Screen: {p.size}</CardText>
            <CardText>{p.productDescription}</CardText>
            <Button onClick={() => handleAddToCart(p)}>Add to Cart</Button>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
</Card>


      </div>
      )}
    </div>
  );
}

export default CustomerHome;
