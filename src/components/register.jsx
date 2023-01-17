

import "../css/register.css"
import { useNavigate } from "react-router-dom"


import Navbar from "../components/navbar"

import { useState } from "react";

import { useDispatch } from "react-redux";
import { load_data } from "../store/counterslice";
import { api_url, headers } from "../config/api"
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { useRef } from "react";
import { update } from "firebase/database";

const App = () => {



    const dispatch = useDispatch()



    const navigate = useNavigate();




    // const [logout, setlogout] = useState(false)



    const [register_data, setregister_data] = useState({ brand: "", pic: "", password: "", products: [] })

    const [loading, setLoading] = useState(false)


    const inputFile = useRef(null)


    const register_brand = () => {


        setLoading(true)


        fetch(`${api_url}/register_brand`, {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(register_data)

        })
            .then((d) => d.json())
            .then((r) => r.type == "success" ? gett() : toast.error("Registration Failed"))



    }





    const uploadMedia = ({ data }) => {






        fetch(`${api_url}/uploadFile`, {

            method: 'POST',
            // headers: headers,
            body: data

        })


            .then((d) => d.json())
            .then((r) => r.type == "success" && setregister_data({ ...register_data, pic: r.data }))

            .catch(err => console.log(err))



    }





    const send_pic = (e) => {

        e.preventDefault()

        const file = e.target.files[0];


        const formData = new FormData

        formData.append("file", file)


        uploadMedia({ data: formData })

    }



    const gett = () => {

        toast.success("Registered Your Brand! Now login and Add products", { position: toast.POSITION.TOP_CENTER })

        fetch(`${api_url}/getdata`, {

            method: 'GET',
            headers: headers

        })
            .then((d) => d.json())
            .then((r) => { dispatch(load_data(r[0])); navigate("/delivery_app/brands"); setLoading(false) })




    }





    return (


        <div className="registerpage">



            <Navbar />




            <span className="parts">

                <div className="left">

                    <input type="text" className="form-control" placeholder="Enter store name" onChange={(e) => setregister_data({ ...register_data, brand: e.target.value })} />
                    {/* <input type="text" className="form-control" placeholder="Enter store logo img url" onChange={(e) => setregister_data({ ...register_data, pic: e.target.value })} /> */}
                    <input className="form-control" onChange={(e) => send_pic(e)} type='file' id='file' ref={inputFile} />
                    <input type="text" onChange={(e) => setregister_data({ ...register_data, password: e.target.value })} placeholder="Set password" className="form-control" />

                    <button onClick={() => { register_brand() }} className="btn btn-warning">{loading ? <Spinner color="light" size="sm" animation="border"></Spinner> : "Register"}</button>

                </div>




                <div className="right">
                    <img src="https://webimages.mongodb.com/_com_assets/cms/kv15ttga69clkiw6z-Homepage_Hero.svg?ixlib=js-3.6.0&auto=format%2Ccompress&w=1446" className="fix" />
                </div>

            </span>








        </div>
    )

}


export default App