
import { useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import "../css/brandstore.css"


import { current_user, filter_prod, add_cart } from "../store/counterslice"


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.js";



import Navbar from "../components/navbar"


import {api_url , headers} from "../config/api"




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
            .then(r => alert("cart updated"))



    }





    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    // console.log(brandkaname)
    // console.log(count.cart.length)






    let product = { products: [] }
    count.brands.map((v) => v.brand.toLowerCase() === brandkaname.toLowerCase() ? product = v : null)





















    return (


        <div className="profile">


            <Navbar />







            <div className="profile_u">

                <div className="pic_div">

                    <img className="main_img" src={product.pic} />

                </div>


                <div className="details_div">

                    <h2>{product.brand}</h2>
                    <h6>established 5 years ago</h6>
                    <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, vel quam. Cum dicta ratione, natus ad ut explicabo perferendis assumenda veritatis itaque! Nesciunt fuga obcaecati voluptatem praesentium, laborum atque unde.</h6>

                </div>



            </div>





            <div className="profile_l">

                {product.products.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={v.img} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className={v.name == count.search.item.name ? "card-title-product searched" : "card-title-product"} >{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-success btn-small" onClick={() => add_to_cart({ v, brandkaname })} >Add</button>

                        </div>

                    </div>

                ))

                }


            </div>







        </div >

    )

}


export default App