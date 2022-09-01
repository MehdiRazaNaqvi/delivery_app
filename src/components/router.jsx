import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./App"
import Brands from "./brands"

import BrandStore from "./brandstore"

import Cart from "./cart"

import Stats from "./stats"

import Register from "./register"

import Auth from "./auth"

import Dashboard from "./dashboard"



import { useDispatch } from "react-redux"

import { load_data, current_user } from "../store/counterslice"
import { useEffect } from "react"



const App = () => {

    const dispatch = useDispatch()


    useEffect(() => { gett(); userExists(); }, [2])






    const userExists = () => {



        var userData = JSON.parse(localStorage.getItem("delivery-user"));

        // console.log(userData)
        userData ?


            dispatch(current_user(userData))




            :
            console.log("new user hai")







    }




    const gett = () => {

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        // fetch('https://bhaiyya-server.herokuapp.com/getdata', {
        fetch('https://emartjs.herokuapp.com/getdata', {

            method: 'GET',
            headers: headers

        })
            .then((d) => d.json())
            .then((r) => dispatch(load_data(r[0])))



    }




    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/delivery_app" element={<Home />} />
                    <Route path="/delivery_app/brands" element={<Brands />} />
                    <Route path="/delivery_app/brands/:brandname" element={<BrandStore />} />
                    <Route path="/delivery_app/cart" element={<Cart />} />
                    <Route path="/delivery_app/stats" element={<Stats />} />
                    <Route path="/delivery_app/register" element={<Register />} />
                    <Route path="/delivery_app/auth" element={<Auth />} />
                    <Route path="/delivery_app/brand-dashboard/:v" element={<Dashboard />} />

                </Routes>
            </Router>
        </div>
    )
}


export default App