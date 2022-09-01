import "../css/Home.css"
import mainimg from "../css/imm.jpg"
import undraw1 from "../css/undraw1.svg"
import { useEffect, useRef } from "react"

import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { load_data } from "../store/counterslice"
import { useSelector } from "react-redux"

import lottie from "lottie-web"


const App = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()






    const container = useRef(null)
    const count = useSelector(state => state.counter)




    useEffect(() => {



        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("./skins/shop.json")
        });





    }, [1]);





    setTimeout(() => {

        count.brands.length > 1 ? navigate("/delivery_app/brands") : console.log("data fetching")


    }, 4000);



    {

        // count.brands.length > 1 ? navigate("/delivery_app/brands") : console.log("data fetching")
    }



    return (
        <div className="homescreen" >







            <div className="part1">

                {/* <h1 className="heading" >We deliver rich and fast</h1> */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" className="heading" />




                <div className="middle" ref={container}></div>



                {/* <span className="btn_span" >
                    <button className="btn_normal btn btn-outline-dark">Join Us</button>
                </span> */}

            </div>













        </div>
    )

}


export default App