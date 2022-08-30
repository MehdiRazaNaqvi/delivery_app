
import { useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import "../css/brandstore.css"


import { current_user, load_data } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";

import { add_cart } from "../store/counterslice"
import { useEffect } from "react";




const App = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();








    const add_to_cart = (payload) => {

        dispatch(add_cart(payload.v))

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        // fetch("http://localhost:4000/add_to_cart", {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(payload)
        // })
        //     .then(r => alert("cart updated"))



    }





    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    // console.log(brandkaname)
    // console.log(count.cart.length)

    let product = {products : []}

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



            <div className="navbar" >


                <img className="logoimg" onClick={() => navigate("/delivery_app/")} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />

                <span className="nav_inner" >

                    <div className="small_nav_img_box">
                        <img src="https://img.icons8.com/fluency-systems-regular/48/000000/favorite-cart.png" onClick={() => navigate("/delivery_app/cart")} className="cart_img" />  <span className="cartlen" >{count.currentUser.cart.length} </span>
                    </div>



                    <div className="small_nav_img_box">
                        <img src="https://img.icons8.com/fluency-systems-regular/48/000000/laptop-metrics.png" className="cart_img" />
                    </div>



                    {count.currentUser.username == "none" ?

                        <div onClick={() => google_login()} className="small_nav_img_box">
                            <img referrerPolicy="no-referrer" className="small_nav_img" src="https://img.icons8.com/material-outlined/24/000000/user--v1.png" />
                        </div>



                        :

                        <div className="small_nav_img_box">
                            <img referrerPolicy="no-referrer" className="small_nav_img" src={count.currentUser.photoURL} />
                        </div>

                    }
                </span>

            </div>








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
                            {/* <img src="https://img.icons8.com/avantgarde/100/000000/add.png" className="btn-small" onClick={() => add_to_cart({ v, brandkaname })} /> */}
                        </div>

                    </div>

                ))

                }


            </div>


        </div>

    )

}


export default App