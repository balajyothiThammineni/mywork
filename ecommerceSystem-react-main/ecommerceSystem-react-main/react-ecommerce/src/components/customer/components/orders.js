import React, { useState, useEffect } from "react";
import CNavbar from "./navbar";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const customerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerResponse = await axios.get(`http://localhost:8080/customer/getByUserId/${customerId}`);
        const customerData = customerResponse.data;

        const ordersResponse = await fetch(`http://localhost:8080/orders/${customerData.customerId}`);
        const ordersData = await ordersResponse.json();

        const ordersWithProductDetails = await Promise.all(
          ordersData.map(async (order) => {
            const productResponse = await axios.get(`http://localhost:8080/products/${order.product.productId}`);
            const productData = productResponse.data;
            return { ...order, productName: productData.name };
          })
        );

        setOrders(ordersWithProductDetails);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [customerId]);

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/customer/dashboard");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <CNavbar />
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-4">My Orders</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Date of Purchase</th>
                  <th>Order Status</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.productName}</td>
                    <td>{order.amount.toFixed(2)}</td>
                    <td>{formatDate(order.dateOfPurchase)}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <Link to={`/customer/addreview/${order.customer.customerId}/${order.product.productId}`}>
                        <button className="btn btn-primary">Review Order</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
