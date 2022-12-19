import "../css/Home.css"
import mainimg from "../css/imm.jpg"
import undraw1 from "../css/undraw1.svg"
import { useEffect, useRef } from "react"

import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import lottie from "lottie-web"


import { load_data, current_user } from "../store/counterslice"
import { api_url, headers } from "../config/api"



const App = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()





    const gett = () => {




        // fetch('https://bhaiyya-server.herokuapp.com/getdata', {
        fetch(`${api_url}/getdata`, {

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




            :
            console.log("new user hai")







    }



    const container = useRef(null)
    const count = useSelector(state => state.counter)




    useEffect(() => {
        gett(); userExists(); 



        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("./skins/shop.json")
        });






    }, [2])


    count.brands.length > 1 ? navigate("/delivery_app/brands") : console.log("database late")








    // const gett = () => {

    //     const headers = {
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         "Access-Control-Allow-Origin": "*",
    //         'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    //         'Access-Control-Allow-Headers': '*'
    //     }


    //     // fetch('https://bhaiyya-server.herokuapp.com/getdata', {
    //     fetch('https://emartjs.herokuapp.com/getdata', {

    //         method: 'GET',
    //         headers: headers

    //     })
    //         .then((d) => d.json())
    //         .then((r) => dispatch(load_data(r[0])))



    // }









    // setTimeout(() => {

    // count.brands.length > 1 ? navigate("/delivery_app/brands") : console.log("database late")


    // }, 2500);



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