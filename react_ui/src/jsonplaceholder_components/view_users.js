import { useEffect, useState } from "react";

function Viewusers(){
    const [users, setusers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setusers(data));
    },[])
    return(
        <div>
            {
                users.map((u,index)=>
                <div key={index}>
                    Name:{u.name}<br />
                    Email:{u.email}<br />
                    City:{u.address.city} <br />
                    Location:{u.address.geo.lat}<br />
                    Contact:{u.phone}<br />
                    Company:{u.company.name}
                    <hr />
                   
                </div>)
            }
        </div>
    );
}
export default Viewusers;