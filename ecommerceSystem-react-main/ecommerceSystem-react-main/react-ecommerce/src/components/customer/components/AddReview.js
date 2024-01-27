import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CNavbar from "./navbar";

function AddReview() {
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 4 && parts[1] === 'addreview') {
      setCustomerId(parts[2]);
      setProductId(parts[3]);
    } else {
      setErrorMsg('Invalid URL format');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/review/${customerId}/${productId}`, {
        rating: parseInt(rating, 10),
        reviewDescription: description,
      });

      console.log(response.data);
      navigate(`/customer/orders/${customerId}`);

    } catch (error) {
      setErrorMsg('Error submitting review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Submit Review</h2>
        {errorMsg && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Rating:</label>
            <select
              value={rating}
              onChange={handleRatingChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Review:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Submit Review
          </button>
        </form>
      </div>
      <CNavbar />
    </div>
  );
}

export default AddReview;
