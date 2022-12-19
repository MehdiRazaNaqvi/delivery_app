

import "../css/register.css"
import { useNavigate } from "react-router-dom"


import Navbar from "../components/navbar"

import { useState } from "react";



import {api_url , headers} from "../config/api"

const App = () => {






    const navigate = useNavigate();




    // const [logout, setlogout] = useState(false)



    const [register_data, setregister_data] = useState({ brand: "", pic: "", password: "", products: [] })





    const register_brand = () => {

   


        fetch(`${api_url}/register_brand`, {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(register_data)

        })
            .then((d) => d.json())
            .then((r) => console.log(r))



    }





    return (
        <div className="registerpage">



            <Navbar />




            <span className="parts">

                <div className="left">

                    <input type="text" className="form-control" placeholder="Enter store name" onChange={(e) => setregister_data({ ...register_data, brand: e.target.value })} /><input type="text" className="form-control" placeholder="Enter store logo img url" onChange={(e) => setregister_data({ ...register_data, pic: e.target.value })} /><input type="text" onChange={(e) => setregister_data({ ...register_data, password: e.target.value })} placeholder="Set password" className="form-control" />
                    <button onClick={() => { register_brand(); navigate("/delivery_app/brands") }} className="btn btn-warning register-btn">Register</button>
                </div>




                <div className="right">
                    <img src="https://webimages.mongodb.com/_com_assets/cms/kv15ttga69clkiw6z-Homepage_Hero.svg?ixlib=js-3.6.0&auto=format%2Ccompress&w=1446" className="fix" />
                </div>

            </span>








        </div>
    )

}


export default App