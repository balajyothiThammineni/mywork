import axios from "axios";
import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import ENavbar from "./navbar";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState("");
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddCategory = () => {
    // Check if category with the same name exists
    if (categories.some(cat => cat.categoryName === categoryName)) {
      setSuccessMessage(`Category "${categoryName}" already exists.`);
      return;
    }

    // Check if category with the same priority exists
    if (categories.some(cat => cat.priority === parseInt(priority))) {
      setSuccessMessage(`Category with priority "${priority}" already exists.`);
      return;
    }

    // If no duplicate, proceed with adding the category
    axios
      .post('http://localhost:8080/category/add', {
        categoryName: categoryName,
        priority: parseInt(priority), // Assuming priority is an integer
      })
      .then(response => {
        console.log(response.data);
        setCategories(prevCategories => [...prevCategories, response.data]);
        setSuccessMessage(`Category "${response.data.categoryName}" added successfully.`);
        setCategoryName("");
        setPriority("");
      })
      .catch(error => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div>
      <ENavbar />

      <div className="container mt-4">
        <Card className="shadow">
          <Card.Body>
            <Card.Title className="mb-4">Category Adding</Card.Title>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form>
              <Form.Group controlId="formCategoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleAddCategory}>
                Add Category
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AddCategory;
