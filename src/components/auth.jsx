
import { useState } from "react"
import "../css/auth.css"

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar"





const App = () => {

    const [authen, setauthen] = useState({ name: "", password: "" });


    const count = useSelector(state => state.counter)
    const navigate = useNavigate()




    const authenticate = () => {


        count.brands.map(v => v.brand.toLowerCase() == authen.name.toLowerCase() ? v.password.toLowerCase() == authen.password.toLowerCase() ? navigate(`/delivery_app/brand-dashboard/${v.brand}`) : alert("Wrong Password") : null)




        // const headers = {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //     "Access-Control-Allow-Origin": "*",
        //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        //     'Access-Control-Allow-Headers': '*'
        // }


        // // fetch('https://bhaiyya-server.herokuapp.com/getdata', {
        // fetch('http://localhost:4000/brand-login', {

        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(authen)

        // })
        //     .then(r => r.json())
        //     .then(data => console.log(data))







    }








    return (


        // count.brands.length > 1 ?


        <div className="auth_base">


            <Navbar />


            <div className="back">
                <input type="text" placeholder="Brand name" className="form-control" onChange={(e) => setauthen({ ...authen, name: e.target.value })} />
                <input type="text" placeholder="Password" className="form-control" onChange={(e) => setauthen({ ...authen, password: e.target.value })} />
                <button className="btn btn-primary register-btn" onClick={() => authenticate()}>Go</button>
            </div>
        </div>

        // :


        // <div className="auth_base">
        //     <h6>Refresh the page</h6>
        // </div>


    )

}




export default App




