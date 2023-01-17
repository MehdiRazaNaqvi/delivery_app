
import { useState } from "react"
import "../css/auth.css"

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar"
import { toast } from 'react-toastify';






const App = () => {

    const [authen, setauthen] = useState({ name: "", password: "" });


    const count = useSelector(state => state.counter)
    const navigate = useNavigate()




    const authenticate = () => {


        count.brands.map(v => v.brand.toLowerCase() == authen.name.toLowerCase() ? v.password.toLowerCase() == authen.password.toLowerCase() ? navigate(`/delivery_app/brand-dashboard/${v._id}`) : toast.error("Wrong Password", { position: toast.POSITION.TOP_CENTER }) : null)




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


        count.brands.length > 0 ?


            <div className="auth_base">



                <Navbar />


                <div className="back">
                    <form style={{ "margin": "0%", "padding": "0%", "width": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "1.5rem" }} action="" onSubmit={(e) => { e.preventDefault(); authenticate() }}>
                        <input required type="text" placeholder="Brand name" className="form-control" onChange={(e) => setauthen({ ...authen, name: e.target.value })} />
                        <input required type="text" placeholder="Password" className="form-control" onChange={(e) => setauthen({ ...authen, password: e.target.value })} />
                        <button type="submit" className="btn btn-primary register-btn">Go</button>
                    </form>
                </div>
            </div>

            :


            <div style={{ marginTop: "50%", textAlign: "center", color: "gray", fontSize: "1rem", fontWeight: 500 }}>Looks like there's no Brand right now!</div>



    )

}




export default App




