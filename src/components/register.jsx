

import "../css/register.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { current_user, logout_local } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";

import Navbar from "../components/navbar"

import { useState } from "react";

const App = () => {

    const count = useSelector(state => state.counter)



    const dispatch = useDispatch()





    const google_login = () => {


        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;


                const obj = { username: user.displayName, photoURL: user.photoURL, uid: user.uid, cart: [] }

                dispatch(current_user(obj))

                localStorage.setItem("delivery-user", JSON.stringify(obj))





            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorMessage")
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }





    const navigate = useNavigate();




    // const [logout, setlogout] = useState(false)



    const [register_data, setregister_data] = useState({ brand: "", pic: "", password: "", products: [] })





    const register_brand = () => {

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        // fetch('https://bhaiyya-server.herokuapp.com/register_brand', {
        fetch('https://emartjs.herokuapp.com/register_brand', {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(register_data)

        })
            .then((d) => d.json())
            .then((r) => console.log("sent"))


    }





    return (
        <div className="registerpage">



       <Navbar/>




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