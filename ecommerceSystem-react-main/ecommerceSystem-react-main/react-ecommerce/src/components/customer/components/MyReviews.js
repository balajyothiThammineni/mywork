import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CNavbar from "./navbar";

function MyReview() {
  const { customerId } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for pid:", customerId);
        const response = await axios.get(`http://localhost:8080/review/getall/${customerId}`);
        console.log("API Response:", response.data);

        // Fetch product details for each review
        const reviewsWithProductDetails = await Promise.all(
          response.data.map(async (review) => {
            const productDetails = await fetchProductDetails(review.product.productId);
            return { ...review, productDetails };
          })
        );
        setReviewData(reviewsWithProductDetails);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchData();
  }, [customerId]);

  const fetchProductDetails = async (productId) => {
    try {
      const productResponse = await axios.get(`http://localhost:8080/products/${productId}`);
      return productResponse.data;
    } catch (error) {
      console.error(`Error fetching product details for product ID ${productId}:`, error);
      return null;
    }
  };

  return (
    <div style={styles.holder}>
      <div style={styles.container}>
        <h3 style={styles.heading}>Reviews given by you </h3>
        {isDataLoaded &&
          reviewData.map((review, index) => (
            <div key={index} style={styles.reviewContainer}>
              {review.productDetails && (
                <p style={styles.detail}>Product: {review.productDetails.name}</p>
              )}
              <p style={styles.detail}>Rating: {review.rating}</p>
              <p style={styles.detail}>Review Description: {review.reviewDescription}</p>
              <p style={styles.detail}>Date: {review.date}</p>
            </div>
          ))}
        {!isDataLoaded ? (
          <p style={styles.loading}>Loading review data...</p>
        ) : reviewData.length === 0 ? (
          <p style={styles.loading}>You have not given any reviews so far.</p>
        ) : null}
        {/* Assuming CNavbar is a component you want to render at the end */}
        <CNavbar />
      </div>
    </div>
  );
}

const styles = {
  holder: {
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

export default MyReview;
