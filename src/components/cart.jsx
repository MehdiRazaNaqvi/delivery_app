import "../css/cart.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { current_user, logout_local } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useEffect, useState } from "react";

import Navbar from "./navbar"


const App = () => {
    const count = useSelector(state => state.counter)



    const dispatch = useDispatch()














    const navigate = useNavigate();




    return (
        <div className="cartpage">

            <Navbar />



            {count.currentUser.cart.length == 0 ? <h4 className="empty">Cart is empty</h4> : null}







            <div className="cartgrid" style={{osition:"relative"}}>
                {count.currentUser.cart.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={v.img} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className="card-title-product">{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-warning btn-small"  >Remove</button>
                        </div>

                    </div>

                ))

                }


                <button onClick={() => navigate("/payment")} className="btn btn-success" style={{position:"absolute" , bottom:"0%"}}>Proceed to Pay</button>

            </div>








        </div>
    )

}


export default App