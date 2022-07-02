
import { useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import "../css/brandstore.css"


import { current_user } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useState } from "react";




const App = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cartshow, setcartshow] = useState(false);

    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    console.log(brandkaname)
    // console.log(count.cart.length)

    let product = {}

    count.brands.map((v) => v.brand.toLowerCase() === brandkaname.toLowerCase() ? product = v : null)




    const google_login = () => {




        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;


                const obj = { name: user.displayName, pic: user.photoURL }

                dispatch(current_user(obj))


            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorMessage")
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }




    return (


        <div class="profile">


            <div className="navbar" >


                <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />

                <span className="nav_inner" >
                    <a onClick={() => setcartshow(!cartshow)}>cart <span className="cartlen"> {count.cart.length} </span> </a>
                    {count.currentUser.name == "none" ?
                        <a onClick={() => google_login()}>sign in</a>
                        :

                        <div className="small_nav_img">
                            <img referrerPolicy="no-referrer" className="small_nav_img" src={count.currentUser.pic} />
                        </div>

                    }
                </span>

            </div>



            <div className={cartshow ? "visible_cart" : "invisible_cart"} >

                {count.cart.map((v, i) => <span className="cart_item" key={i}>  <h6 className="cart_con" >{v}</h6> <button className="btn btnremove btn-outline-dark">Remove</button> </span>)}


            </div>




            <div class={cartshow == false ? "profile_u" : "invisible_cart"}>

                <div class="pic_div">

                    <img className="main_img" src={product.pic} />

                </div>


                <div class="details_div">

                    <h2>{product.brand}</h2>
                    <h6>established 5 years ago</h6>
                    <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, vel quam. Cum dicta ratione, natus ad ut explicabo perferendis assumenda veritatis itaque! Nesciunt fuga obcaecati voluptatem praesentium, laborum atque unde.</h6>

                </div>



            </div>





            <div class={cartshow === false ? "profile_l" : "invisible_cart"}>

                {product.products.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={v.img} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className="card-title-product">{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-success btn-small">Add to cart</button>
                        </div>

                    </div>

                ))

                }


            </div>


        </div>

    )

}


export default App