import "../css/cart.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { remove_from_cart } from "../store/counterslice"




import Navbar from "./navbar"
import { api_url } from "../config/api";


const App = () => {
    
    const count = useSelector(state => state.counter)



    const dispatch = useDispatch()









    const navigate = useNavigate();




    return (
        <div style={{ height: "minContent" }} className="cartpage">

            <Navbar />



            {count.currentUser.cart.length == 0 ? <h4 className="empty">Cart is empty</h4> : null}







            <div className="cartgrid" style={{ position: "relative" }}>
                <h1 style={{ position: "absolute", top: "0%", color: "gray" }}>Rs. {count.price}</h1>
                {count.currentUser.cart.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={`${api_url}/images/${v.img}`} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className="card-title-product">{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-warning btn-small" onClick={() => dispatch(remove_from_cart({ i, v }))} >Remove</button>
                        </div>

                    </div>

                ))

                }


                <button disabled={count.currentUser.cart.length == 0} onClick={() => navigate("/payment")} className="btn btn-success" style={{ position: "absolute", bottom: "0%" }}>Proceed to Pay</button>

            </div>








        </div>
    )

}


export default App