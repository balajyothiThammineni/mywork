import React, { useState } from "react";
import SNavbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    colour: "",
    featured: false,
    image: "",
    name: "",
    price: "",
    productDescription: "",
    size: "",
    stock: 0,
    cid: "",
    sid: localStorage.getItem("sid"),
  });

  const regexAlpha = /^[a-zA-Z]+$/;
  const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
  const regexNumber = /^[0-9]+$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use regex to validate input based on field name
    let isValidInput = true;
    switch (name) {
      case "colour":
      case "name":
        isValidInput = regexAlpha.test(value);
        break;
      case "image":
        isValidInput = regexURL.test(value);
        break;
      case "price":
      case "cid":
        isValidInput = regexNumber.test(value);
        break;
      default:
        break;
    }

    // Update state only if the input is valid
    if (isValidInput) {
      setProductData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add logic to send the productData to your backend for processing
    console.log("Product data submitted:", productData);
    try {
      // Make a POST request to your endpoint
      const response = await axios.post(
        `http://localhost:8080/product/add/${productData.sid}/${productData.cid}`,
        productData
      );

      // Handle the response as needed
      alert("Product added successfully");
      navigate("/seller/myproducts");
    } catch (error) {
      // Handle errors
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <SNavbar />
      <div className="container mt-5">
        <div className="card border-primary">
          <div className="card-body">
            <h3 className="card-title mb-4 text-primary">Add Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="colour" className="form-label">
                    Colour
                  </label>
                  <input
                    type="text"
                    id="colour"
                    name="colour"
                    value={productData.colour}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={productData.featured}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="featured" className="form-check-label">
                  Featured
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="img" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  id="img"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="product_description" className="form-label">
                  Product Description
                </label>
                <textarea
                  id="product_description"
                  name="productDescription"
                  value={productData.productDescription}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={productData.size}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category_category_id" className="form-label">
                  Category ID
                </label>
                <input
                  type="number"
                  id="category_category_id"
                  name="cid"
                  value={productData.cid}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
