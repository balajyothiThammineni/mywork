import { useSearchParams } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import Products from "./components/products";
import Login from "../auth/login";

function CustomerDashboard(){
    const [param] = useSearchParams();

    const process = ()=>{
        if(!param.get('page')){
            return  <div>
             <h1>Dashboard</h1>
        </div>
        }
        if(param.get('page') === 'products'){
            return <div>
                <Products />
            </div>
        }
        if(param.get('page') === 'cart'){
            return <div>
                <h1>Cart</h1>
            </div>
        }
        if(param.get('page') === 'previous_orders'){

             if(localStorage.getItem('isLoggedIn') === null){
                localStorage.setItem('url','/customer/dashboard?page=previous_orders')
               
             }
            return <div>
               
                <Login />
            </div>
        }

    }
    return(
        <div>
            <NavbarComponent />
         
            {process()}
        </div>
    ) 
}

export default CustomerDashboard;