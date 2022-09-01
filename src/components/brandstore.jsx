
import { useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import "../css/brandstore.css"


import { current_user, logout_local, add_cart } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";


import { useState } from "react";

import Navbar from "../components/navbar"



const App = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();



    const [logout, setlogout] = useState(false)




    const add_to_cart = (payload) => {

        dispatch(add_cart(payload.v))

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        fetch("https://emartjs.herokuapp.com/add_to_cart", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(r => alert("cart updated"))



    }





    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    // console.log(brandkaname)
    // console.log(count.cart.length)

    let product = { products: [] }

    count.brands.map((v) => v.brand.toLowerCase() === brandkaname.toLowerCase() ? product = v : null)






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













    return (


        <div className="profile">


            <Navbar />







            <div className="profile_u">

                <div className="pic_div">

                    <img className="main_img" src={product.pic} />

                </div>


                <div className="details_div">

                    <h2>{product.brand}</h2>
                    <h6>established 5 years ago</h6>
                    <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, vel quam. Cum dicta ratione, natus ad ut explicabo perferendis assumenda veritatis itaque! Nesciunt fuga obcaecati voluptatem praesentium, laborum atque unde.</h6>

                </div>



            </div>





            <div className="profile_l">

                {product.products.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={v.img} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className="card-title-product">{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-success btn-small" onClick={() => add_to_cart({ v, brandkaname })} >Add</button>

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