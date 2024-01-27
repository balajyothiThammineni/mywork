
import { Route, Routes } from "react-router";
import "./App.css";
import CustomerDashboard from "./components/customer/dashboard";
import ExecutiveDashboard from "./components/executive/dashboard";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Clogin from "./components/auth/clogin";  
import Signup from "./components/auth/signup";
import Logout from "./components/auth/logout";
import SellerHome from "./components/seller/components/home";
import ExecutiveHome from "./components/executive/components/home";
import Addcategory from "./components/executive/components/addcategory";
import Sellerview from "./components/executive/components/sellerview";
import CustomerView from "./components/executive/components/customervview";
import Login from "./components/auth/login"; 
import Products from "./components/customer/components/products";
import Cart from "./components/customer/components/cart";
import CustomerHome from "./components/customer/components/home";
import Review from "./components/customer/components/Reviews";
import MyReview from "./components/customer/components/MyReviews";
import Register from "./components/auth/register";
import MyProducts from "./components/seller/components/myproducts";
import UpdateDetails from "./components/seller/components/updatedetails";
import OrderSuccess from "./components/customer/components/ordersuccess";
import Order from "./components/customer/components/orders";
import Contact from "./components/customer/components/contact";
import AddReview from "./components/customer/components/AddReview";
import AddProduct from "./components/seller/components/addproduct";

function App() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        
        {/* COMMON */}

        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/clogin" element={<Clogin />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/logout" element={<Logout />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>

        {/* EXECUTIVE */}

        <Route path="/executive/Home" element={<ExecutiveHome />}></Route>
        <Route path="/addcategory" element={<Addcategory/>}></Route>

        {/* SELLER */}

        <Route path="/seller/myproducts" element={<MyProducts />}></Route>
        <Route path="/seller/updatedetails" element={<UpdateDetails/>}></Route>
        <Route path="/Sellerview" element={<Sellerview/>}></Route>
        <Route path="/seller/Home" element={<SellerHome/>}></Route>
        <Route path="/seller/addproduct" element={<AddProduct/>}></Route>

        {/* CUSTOMER */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />}></Route>
        <Route path="/customer/products" element={<Products />}></Route>
        <Route path="/customer/ordersuccess" element={<OrderSuccess />}></Route>
        <Route path="/customer/orders/:customerId" element={<Order />}></Route>
        <Route path="/customer/contact" element={<Contact />}></Route>
        <Route path="/customer/review/:pid" element={<Review />}></Route>
        <Route path="/customer/addreview/:customerId/:productId" element={<AddReview />}></Route>
        <Route path="/customer/myreviews/:customerId" element={<MyReview />}></Route>
        <Route path="/customer/cart" element={<Cart />}></Route>
        <Route path="/customer/home" element={<CustomerHome />}></Route>
        <Route path="/CustomerView" element={<CustomerView/>}></Route>

      </Routes>
    </div>
  );
}

export default App;