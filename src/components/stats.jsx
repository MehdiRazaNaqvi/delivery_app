

import "../css/stats.css"
import { useNavigate } from "react-router-dom"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { current_user, logout_local } from "../store/counterslice";




import { Bar, Pie, Line, Doughnut, Radar, PolarArea, Scatter, Bubble } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import Navbar from "../components/navbar"





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




    const [userdata, setuserdata] = useState({


        labels: ["Olivia", "Hemani", "Dell", "grocery"],

        datasets: [{
            label: "brands", data: [3, 4, 5, 4], backgroundColor: ["rgb(250, 234, 99)", "lightsalmon", "lightgrey", "lightgreen"], barPercentage: 0.5,
            barThickness: 20,

            tension: 0.4,

        }]
    })




    return (
        <div className="stats_base">


            <Navbar />




            <div className="charts">



                <div className="chart one">

                    <span className="tp"><h1 className="main">{count.cart.length}</h1> sales</span>
                    <span className="ep">

                        <Pie
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />

                    </span>


                </div>





                <div className="chart two">

                    <Bar
                        className="actual_bar"
                        data={userdata}



                        height='50vh'
                        width='50vw'
                        options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                    />
                </div>



                <div className="chart three">



                    <span className="tp"><h1 className="main">{count.brands.length}</h1> brands</span>
                    <span className="ep">

                        <Doughnut
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />

                    </span>

                </div>





                <div className="chart four">

                    <Line
                        className="actual_bar"
                        data={userdata}





                        options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                    />


                </div>





                <div className="chart five">


                    <span className="tp"><h1 className="main">{count.users.length}</h1> users</span>
                    <span className="ep">

                        <PolarArea
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />

                    </span>




                </div>



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



