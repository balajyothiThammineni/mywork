import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CNavbar from "./navbar";

function Review() {
  const { pid } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for pid:", pid);
        // const response = await axios.get(`http://localhost:8080/review/product/${pid}`);
        // const productData = await axios.get(`http://localhost:8080/products/${pid}`);
        // console.log("API Response:", response.data);
        // setProduct(productData.data);
        // console.log(product.name)
        // setReviewData(response.data);
        setIsDataLoaded(true); 


        // Fetch product details
        const productResponse = await axios.get(`http://localhost:8080/products/${pid}`);
        setProduct(productResponse.data);
        // Fetch product reviews
        const reviewsResponse = await axios.get(`http://localhost:8080/review/product/${pid}`);
        setReviewData(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchData();
  }, [pid]);

  return (
    <div style={styles.holder}>
      <div style={styles.container}>
        { product && (
          <h3 style={styles.heading}>{product.name} Reviews</h3>
        )}
        {isDataLoaded && reviewData.length > 0 ? (
          reviewData.map((review, index) => (
            <div key={index} style={styles.reviewContainer}>
              <p style={styles.detail}>Rating: {review.rating}</p>
              <p style={styles.detail}>Review Description: {review.reviewDescription}</p>
              <p style={styles.detail}>Date: {review.date}</p>
            </div>
          ))
        ) : isDataLoaded ? (
          <p style={styles.loading}>No reviews available for this product.</p>
        ) : (
          <p style={styles.loading}>Loading review data...</p>
        )}
        <CNavbar />
      </div>
    </div>
  );
}

const styles = {
  holder:{
    marginTop: '100px'
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  reviewContainer: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    marginBottom: "10px",
  },
  detail: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  loading: {
    fontSize: "16px",
    color: "#888",
  },
};

export default Review;
