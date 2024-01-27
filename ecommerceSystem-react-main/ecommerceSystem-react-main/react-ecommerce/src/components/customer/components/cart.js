import React, { useState, useEffect } from "react";
import CNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    setQuantities(Array(cart.length).fill(1));
  }, [cart]);

  const updateQuantity = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotalAmount = (item) => {
    const index = cart.indexOf(item);
    const quantity = quantities[index];
    return item.price * quantity;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * quantities[index];
    });
    return total;
  };

  const saveAllOrders = async (orderDTOList) => {
    try {
      const response = await fetch(`http://localhost:8080/order/saveall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDTOList),
      });
  
      if (!response.ok) {
        throw new Error(`Error saving orders: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving orders:', error);
      throw error;
    }
  };

  const convertCartToDTO = (cartItems, customerId) => {
    return cartItems.map((cartItem, index) => {
      return {
        orderId: index + 1, // Assuming orderId is sequential, you may adjust this logic
        totalPrice: cartItem.price, // Assuming price is available in your cart item
        quantity: quantities[index],
        pid: cartItem.productId,
        cid: customerId,
      };
    });
  };
  

  const  placeOrder = async () => {
    var userId = parseInt(localStorage.getItem('id'), 10);
    
    axios
    .get(`http://localhost:8080/customer/getByUserId/${userId}`)
    .then(async (response) => {
      localStorage.setItem('customerId',response.data.customerId)
      const dtoArray = convertCartToDTO(cart, response.data.customerId);
      console.log(dtoArray);
  
  
      try {
        const response = await saveAllOrders(dtoArray);
        console.log(response); // Assuming the response from the backend is logged
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error('Error saving orders:', error);
      }
    })
    .catch((error) => {
      console.error("Error fetching seller:", error);
    });

   

    navigate("/customer/ordersuccess");
  };

  return (
    <div class="mt-5 pt-5" >
      <table class="table table-striped table-light mt-5">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>Rs.{item.price}</td>
              <td>
                <input
                  type="number"
                  value={quantities[index]}
                  min="1"
                  max="5"
                  onChange={(e) => updateQuantity(index, e.target.value)}
                />
              </td>
              <td>Rs.{getTotalAmount(item)}</td>
              <td>
                <button
                  class="btn btn-warning"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total Price: Rs.{getTotalPrice()}</td>
            <td colspan="5">
            {cart && cart.length > 0 && (
              <button onClick={placeOrder} class="btn btn-success fw-bold">
                Order
              </button>
            )}
            </td>
          </tr>
        </tfoot>
      </table>
      <CNavbar />
    </div>
  );
}

export default Cart;
