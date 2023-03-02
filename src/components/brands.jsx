import "../css/brands.css"
import { useNavigate } from "react-router-dom"


import { Badge } from "reactstrap"
import alanBtn from "@alan-ai/alan-sdk-web"
import { filter_brand, current_user, voice_add_cart } from "../store/counterslice"

import { useEffect } from "react";


import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux"









import Navbar from "../components/navbar"
import { api_url } from "../config/api"




const App = () => {

    const count = useSelector(state => state.counter)

    const container = useRef(null)
    const navigate = useNavigate();

    const store = [];

    count.brands?.map((v) => store.push(v))



    {
        count.search.brandnavi != "" ? navigate(`/delivery_app/brands/${count.search.brandnavi}`) : console.log("notsearched yet")
    }







    return (
        <div className="storespage">




            <Navbar />






            {count.brands?.length < 1 ?

                <div ref={container} className="anim">
                    {/* <img src={Gif} className="gif" /> */}
                    No Brands to Show
                </div>



                :



                <div className="brand-grid"  >

                    {store.map((v, i) => (




                        <div key={i} onClick={() => navigate(`/delivery_app/brands/${v._id}`)} className="brandover">

                            <img className="brand-img brand-img-res" src={`${api_url}/images/${v.pic}`} />
                            <p className="brand-name" style={{ fontSize: "2rem" }}>{v.brand}</p>



                        </div>

                    ))}

                </div>








            }











        </div>
    )

}


export default App