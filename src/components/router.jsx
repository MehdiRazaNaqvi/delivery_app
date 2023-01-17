import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"

import Home from "./App"
import Brands from "./brands"

import BrandStore from "./brandstore"

import Cart from "./cart"

import Stats from "./stats"

import Register from "./register"

import Auth from "./auth"

import Dashboard from "./dashboard"

import Payment from "./stripe"




import { useDispatch } from "react-redux"

import { load_data, current_user } from "../store/counterslice"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { api_url, headers } from "../config/api"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

    const dispatch = useDispatch()
    const count = useSelector(state => state.counter)







    const userExists = () => {



        var userData = JSON.parse(localStorage.getItem("delivery-user"));

        // console.log(userData)
        userData ?


            dispatch(current_user(userData))




            :
            console.log("new user hai")







    }



    const gett = () => {




        // fetch('https://bhaiyya-server.herokuapp.com/getdata', {
        fetch(`${api_url}/getdata`, {

            method: 'GET',
            headers: headers

        })
            .then((d) => d.json())
            .then((r) => dispatch(load_data(r[0])))




    }




    useEffect(() => {


        gett()

        userExists()
    }, [2])




    {

        // count.brands.length > 1 ? navigate("/delivery_app/btands") : console.log("database late")
    }



    return (
        <div>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/delivery_app" element={<Home />} />
                    <Route path="/delivery_app/brands" element={<Brands />} />
                    <Route path="/delivery_app/brands/:brandId" element={<BrandStore />} />
                    <Route path="/delivery_app/cart" element={<Cart />} />
                    <Route path="/delivery_app/stats" element={<Stats />} />
                    <Route path="/delivery_app/register" element={<Register />} />
                    <Route path="/delivery_app/auth" element={<Auth />} />
                    <Route path="/delivery_app/brand-dashboard/:v" element={<Dashboard />} />
                    <Route path="/payment" element={<Payment />} />


                </Routes>
            </Router>
        </div>
    )
}


export default App