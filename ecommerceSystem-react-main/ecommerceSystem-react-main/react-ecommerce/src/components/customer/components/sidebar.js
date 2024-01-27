import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import Products from "./products";
import { useSearchParams } from "react-router-dom";
import Home from "../../home";


function Sidebar() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [msg, setMsg] = useState('');
  const [param] = useSearchParams();


  useEffect(() => {
    axios.get('http://localhost:8080/category/getall')
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch(error => setMsg('Error in Fetching categories'));
  }, []);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate('/customer/dashboard?page=products&cid='+categoryId);
  
    
   };

  return (
    <div style={{ opacity: 0.8 }}>
      {categories && categories.length > 0 && (
      <Card className="categories-card" style={{ width: "80%", marginTop: "120px" }}>
        <ListGroup>
          <CardHeader style={{ backgroundColor: "blue", color: "#fff" }}>
            Categories
          </CardHeader>
        {categories.map((c, index) => (
          <ListGroupItem
            key={index}
            style={{
              border: "none",
              backgroundColor: selectedCategory === c.categoryId ? "#007bff" : "",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(c.categoryId)}>
              
              {c.categoryName}
              {/* </Nav.Link> */}

          </ListGroupItem>
        ))}
        </ListGroup>
      </Card>
      )}
    </div>
  );
}

export default Sidebar;
