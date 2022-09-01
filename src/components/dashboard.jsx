import { useParams } from "react-router-dom"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";


import { useSelector, useDispatch } from "react-redux";
import { current_user, logout_local } from "../store/counterslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../css/dashboard.css"

import Navbar from "../components/navbar"

import { Bar, Pie, Line, Doughnut, Radar, PolarArea, Scatter, Bubble } from "react-chartjs-2";
import Chart from 'chart.js/auto';










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




    const brandn = useParams()


    let brand = { products: [] }

    count.brands.map((v) => v.brand.toLowerCase() === brandn.v.toLowerCase() ? brand = v : null)



    let revenue = 0;
    let i = 0;



    const calculate_revenue = (v) => {
        revenue = revenue + parseInt(v.v.price);
        i = i + 1
    }



    {
        count.cart.map(v => brandn.v.toLocaleLowerCase() == v.brandkaname.toLocaleLowerCase() ? calculate_revenue(v) : console.log("other company"))
    }





    console.log(revenue)
    console.log(i)

    const [form_data, setform_data] = useState({ name: "", price: Number, img: "", brand: brandn.v })



    const [userdata, setuserdata] = useState({


        labels: ["Olivia", "Hemani", "Dell", "grocery"],

        datasets: [{
            label: "brands", data: [3, 4, 5, 4], backgroundColor: ["rgb(250, 234, 99)", "lightsalmon", "lightgrey", "lightgreen"], barPercentage: 0.5,
            barThickness: 20,

            tension: 0.4,

        }]
    })





    const add_product = () => {



        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        // fetch('https://bhaiyya-server.herokuapp.com/register_brand', {
        fetch('https://emartjs.herokuapp.com/add-prod', {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(form_data)

        })
            .then((d) => alert("Added"))



    }




    return (




        <div className="dashboard_base">

            <Navbar />



            <div className="line">


                <div className="box">

                    <span className="sp"><h1 className="dash-main">{revenue}</h1>earned</span>
                    <span className="bp">

                        <Doughnut
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>


                <div className="box dosra">

                    <span className="sp"><h1 className="dash-main">{brand.products.length}</h1>products</span>
                    <span className="bp">

                        <Pie
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>



                <div className="box tesra">

                    <span className="sp"><h1 className="dash-main">{i}</h1> items sold</span>
                    <span className="bp">

                        <Doughnut
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>






            </div>




            <div className="form">

                <h6>Add your product</h6>

                <input type="text" placeholder="Product name" onChange={(e) => setform_data({ ...form_data, name: e.target.value })} className="form-control" />
                <input type="text" placeholder="Price" onChange={(e) => setform_data({ ...form_data, price: e.target.value })} className="form-control" />
                <input placeholder="Image url" onChange={(e) => setform_data({ ...form_data, img: e.target.value })} type="text" className="form-control" />
                <button className="btn btn-primary add-btn" onClick={() => add_product()}>Add Product</button>

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