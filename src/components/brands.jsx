import "../css/brands.css"
import { useNavigate } from "react-router-dom"



import alanBtn from "@alan-ai/alan-sdk-web"
import { filter_brand, current_user, voice_add_cart } from "../store/counterslice"

import { useEffect } from "react";


import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux"



import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";




import Gif from "./skins/gif.gif"
import Navbar from "../components/navbar"




const App = () => {

    const count = useSelector(state => state.counter)

    const dispatch = useDispatch()






    const container = useRef(null)
    const navigate = useNavigate();

    const store = [];

    count.brands.map((v) => store.push(v))




    // const [logout, setlogout] = useState(false)




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








    useEffect(() => {










        function updateScreen(time) {

            alanBtn({

                key: "c6eb400ab872978fad3b004399eccbd82e956eca572e1d8b807a3e2338fdd0dc/stage",

                onCommand: (commandData) => {

                    if (commandData.command === "voice_add_cart") {

                        // console.log(product)


                        dispatch(voice_add_cart(commandData.data))



                    }


                    if (commandData.command === "filter-brand") {

                        // console.log(product)


                        dispatch(filter_brand(commandData.data))



                    }


                    if (commandData.command === "cart") {
                        // console.log("cart dekhna chahrha")

                        navigate("/delivery_app/cart")
                    }



                    if (commandData.command === "stats") {
                        // console.log("cart dekhna chahrha")

                        navigate("/delivery_app/stats")
                    }




                    if (commandData.command === "brand-login") {
                        // console.log("cart dekhna chahrha")

                        navigate("/delivery_app/auth")
                    }


                    if (commandData.command === "register-brand") {
                        // console.log("cart dekhna chahrha")

                        navigate("/delivery_app/register")
                    }



                    if (commandData.command === "google-login") {
                        // console.log("cart dekhna chahrha")

                        google_login()
                    }





                }
            })
        }





        requestAnimationFrame(updateScreen);
    }, [])






    {
        count.search.brandnavi != "" ? navigate(`/delivery_app/brands/${count.search.brandnavi}`) : console.log("notsearched yet")
    }






    return (
        <div className="storespage">


            {/* 
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


            </div> */}

            <Navbar />






            {count.brands.length < 1 ?

                <div ref={container} className="anim">
                    <img src={Gif} className="gif" />
                </div>



                :



                <div className="brand-grid"  >

                    {store.map((v, i) => (

                        // <div key={i} onClick={() => navigate(`/delivery_app/brands/${v.brand}`)} className="card" >





                        //     <div className="card-img-overlay">

                        //         <h6 className="card-title">{v.brand}</h6>

                        //     </div>

                        // </div>




                        <div key={i} onClick={() => navigate(`/delivery_app/brands/${v.brand}`)} className="brandover">
                            <img className="brand-img" src={v.pic} />
                            <p className="brand-name">{v.brand}</p>

                        </div>

                    ))}

                </div>








            }











        </div>
    )

}


export default App