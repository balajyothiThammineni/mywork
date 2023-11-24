import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
 

function NavbarComponent(){

    const navigate = useNavigate();
    return(
        <div className="mb-4">
            <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Navbar.Brand onClick={()=>navigate('/customer/dashboard')}>Customer Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/customer/dashboard?page=products')}>Products</Nav.Link>
            <Nav.Link onClick={()=>navigate('/customer/dashboard?page=cart')}>Cart</Nav.Link>
            <Nav.Link onClick={()=>navigate('/customer/dashboard?page=previous_orders')}>Previous Orders</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      
        </div>
    )
}

export default NavbarComponent;