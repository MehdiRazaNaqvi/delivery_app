import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";


import { useSelector, useDispatch } from "react-redux";
import { current_user, logout_local } from "../store/counterslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";














const App = () => {


    const count = useSelector(state => state.counter)
    const navigate = useNavigate();
    const dispatch = useDispatch();




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





    return (



        <div className="navbar" >


            <img className="logoimg" onClick={() => navigate("/delivery_app")} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />


            <span className="nav_inner" >

                <div className="small_nav_img_box">
                    <img src="https://img.icons8.com/fluency-systems-regular/48/000000/favorite-cart.png" onClick={() => navigate("/delivery_app/cart")} className="cart_img" />  <span className="cartlen" >{count.currentUser.cart.length} </span>
                </div>



                <div className="small_nav_img_box">
                    <img src="https://img.icons8.com/fluency-systems-regular/48/000000/laptop-metrics.png" onClick={() => navigate("/delivery_app/stats")} className="cart_img" />
                </div>






                {count.currentUser.username == "none" ?

                    <div onClick={() => google_login()} className="small_nav_img_box">
                        <img referrerPolicy="no-referrer" className="small_nav_img" src="https://img.icons8.com/material-outlined/24/000000/user--v1.png" />
                    </div>



                    :

                    <div className="small_nav_img_box">
                        <img referrerPolicy="no-referrer" onClick={() => setlogout(!logout)} className="small_nav_img" src={count.currentUser.photoURL} />
                    </div>

                }
            </span>



            <div className={logout ? "logout" : "invisible"}>
                <p onClick={() => navigate("/delivery_app/register")}> Register your Brand </p>
                <p onClick={() => navigate("/delivery_app/auth")}> Log in as a brand </p>
                <p onClick={() => { dispatch(logout_local()); setlogout(false) }} > Logout? </p>
            </div>

        </div>











    )

}


export default App