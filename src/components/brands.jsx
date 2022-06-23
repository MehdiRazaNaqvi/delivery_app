import "../css/brands.css"
import { useNavigate } from "react-router-dom"


import { useDispatch } from "react-redux";
import {current_user} from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";

const provider = new GoogleAuthProvider();



const App = () => {


    const dispatch = useDispatch()


    const google_login = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                
                const user = result.user;
                

                const obj = {name : user.displayName , pic : user.photoURL}
                console.log(obj)
                dispatch(current_user(obj))


            }).catch((error) => {
                
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorMessage")
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }



    const navigate = useNavigate();

    const store = [
        "Olivia",
        "Hemani",
        "J",
        "Ponds",
        "Grocery",
        "Dairy",
        "Olay",
        "Gul Ahmed",
        "Dalda",

    ]

    return (
        <div className="storespage">

            <div className="navbar" >


                <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />

                <span className="nav_inner" >
                    <a href="/cart">cart</a>
                    <a onClick={() => google_login()}>sign in</a>
                </span>

            </div>


            {/* 
            <div className="divu" >
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/grocery.jpg" />
            </div>




            <div className="divu" >
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/food.jpg" />
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
            </div>




            <div className="divu" >
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/pharma.jpg" />
            </div>


            <div className="divu" >
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/dairy.jpg" />
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
            </div> */}





            <div className="grid" >

                {store.map((v, i) => (

                    <div key={i} onClick={() => navigate(`/brands/${v}`)} className="card" >





                        <div className="card-img-overlay">

                            <h6 className="card-title">{v}</h6>

                        </div>

                    </div>

                ))}

            </div>





        </div>
    )

}


export default App