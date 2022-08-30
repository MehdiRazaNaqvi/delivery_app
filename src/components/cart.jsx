import "../css/cart.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { current_user, load_data } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useEffect } from "react";




const App = () => {
    const count = useSelector(state => state.counter)



    const dispatch = useDispatch()




    const gett = () => {

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        fetch('https://bhaiyya-server.herokuapp.com/getdata', {
            method: 'GET',
            headers: headers

        })
            .then((d) => d.json())
            .then((r) => dispatch(load_data(r[0])))



    }





    const userExists = () => {



        var userData = JSON.parse(localStorage.getItem("delivery-user"));

        // console.log(userData)
        userData ?


            dispatch(current_user(userData))




            : console.log("nae hai")







    }





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




    useEffect(() => { gett(); userExists() }, [2])



    return (
        <div className="cartpage">


            <div className="navbar" >


                <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />

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








        </div>
    )

}


export default App