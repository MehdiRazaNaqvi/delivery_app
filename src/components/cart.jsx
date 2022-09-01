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


    const [logout, setlogout] = useState(false)




    const navigate = useNavigate();




    return (
        <div className="cartpage">

            <Navbar />



            {count.currentUser.cart.length == 0 ? <h4 className="empty">Cart is empty</h4> : null}







            <div className="cartgrid">
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

            </div>





            <div className={logout ? "logout" : "invisible"}>
                <p onClick={() => navigate("/delivery_app/register")}> Register your Brand </p>
                <p onClick={() => navigate("/delivery_app/auth")}> Log in as a brand </p>
                <p onClick={() => { dispatch(logout_local()); setlogout(false) }} > Logout? </p>
            </div>


        </div>
    )

}


export default App