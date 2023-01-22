
import { useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import "../css/brandstore.css"


import { current_user, filter_prod, add_cart } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";



import Navbar from "../components/navbar"


import { api_url, headers } from "../config/api"
import { toast } from "react-toastify";




const App = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();



    // const [logout, setlogout] = useState(false)









    const add_to_cart = (payload) => {

        dispatch(add_cart(payload.v))



        fetch(`${api_url}/add_to_cart`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(r => toast.success("Added"))



    }





    const d = useParams();
    const brandId = d.brandId


    const count = useSelector(state => state.counter)


    let product = { products: [] }

    count.brands.map((v) => v._id == brandId ? product = v : null)












    return (


        <div className="profile">


            <Navbar />







            <div className="profile_u">

                <div className="pic_div">

                    <img className="main_img" src={`${api_url}/images/${product.pic}`} />

                </div>


                <div className="details_div">

                    <h2 style={{ fontSize: "6rem" }} className="card-title-product">{product.brand}</h2>
                    <h6>established 5 years ago</h6>
                    <h6 style={{ width:"85%"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, vel quam. Cum dicta ratione, natus ad ut explicabo perferendis assumenda veritatis itaque! Nesciunt fuga obcaecati voluptatem praesentium, laborum atque unde.</h6>

                </div>



            </div>




            {product.products?.length > 0 ?

                <div className="profile_l">

                    {product.products.map((v, i) => (


                        <div key={i} className="card-product">

                            <img src={`${api_url}/images/${v.img}`} className="card-img-product" />

                            <div className="card-img-overlay-product">
                                <h6 className={v.name == count.search.item.name ? "card-title-product searched" : "card-title-product"} >{v.name}</h6>
                                <h6 className='price-product'>Rs. {v.price}</h6>
                                <button className="btn btn-outline-success btn-small" onClick={() => add_to_cart({ v, brandId })} >Add</button>

                            </div>

                        </div>

                    ))

                    }


                </div>


                :


                <div style={{ marginTop: "5rem", textAlign: "center", color: "gray", fontSize: "1rem", fontWeight: 500 }}>No Products to Show</div>


            }


        </div >

    )

}


export default App