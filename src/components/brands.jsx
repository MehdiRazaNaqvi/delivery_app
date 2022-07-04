import "../css/brands.css"
import { useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import { current_user , load_data } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useEffect , useState } from "react";





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



    useEffect(() => {
        
        gett()
    
    } , []);





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




    const [cartshow, setcartshow] = useState(false);





    const navigate = useNavigate();

    const store = [];

    count.brands.map((v) => store.push(v.brand))




    return (
        <div className="storespage">


            <div className="navbar" >


                <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />

                <span className="nav_inner" >
                    <a onClick={() => setcartshow(!cartshow)} >cart  <span className="cartlen" >{count.cart.length} </span> </a>
                    {count.currentUser.name == "none" ?
                        <a onClick={() => google_login()}>sign in</a>
                        :

                        // <div className="small_nav_img">
                        <img referrerPolicy="no-referrer" className="small_nav_img" src={count.currentUser.pic} />
                        // </div>

                    }
                </span>

            </div>




            <div className={cartshow ? "visible_cart" : "invisible_cart"} >

                {count.cart.map((v, i) => <span className="cart_item" key={i}>  <h6 className="cart_con" >{v}</h6> <button className="btn btnremove btn-outline-dark">Remove</button> </span>)}


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





            <div className={cartshow == false ? "grid" : "invisible_cart"} >

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