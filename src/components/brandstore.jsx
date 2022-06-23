
import { useNavigate, useParams } from "react-router-dom"

import { useSelector } from "react-redux"
import "../css/brandstore.css"

const App = () => {

    const navigate = useNavigate();

    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    console.log(brandkaname)

    let product = {}

    count.brands.map((v) => v.brand.toLowerCase() === brandkaname.toLowerCase() ? product = v : null)






    return (


        <div class="profile">

            <div className="navbar" >


                <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emart_Logo.svg/1280px-Emart_Logo.svg.png" />
                <span className="nav_inner" >
                    
                    <a href="/cart">cart</a>
                    <a href="/brands">sign in</a>
                </span>

            </div>



            <div class="profile_u">

                <div class="pic_div">

                    <img className="main_img" src={product.pic} />

                </div>

                <div class="details_div">
                    <h2>{product.brand}</h2>
                    <h6>established 5 years ago</h6>
                    <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, vel quam. Cum dicta ratione, natus ad ut explicabo perferendis assumenda veritatis itaque! Nesciunt fuga obcaecati voluptatem praesentium, laborum atque unde.</h6>

                </div>


            </div>



            <div class="profile_l">

                {product.products.map((v, i) => (


                    <div key={i} className="card-product">

                        <img src={v.img} className="card-img-product" />
                        <div className="card-img-overlay-product">
                            <h6 className="card-title-product">{v.name}</h6>
                            <h6 className='price-product'>Rs. {v.price}</h6>
                            <button className="btn btn-outline-success btn-small">Add to cart</button>
                        </div>

                    </div>

                ))

                }


            </div>


        </div>

    )

}


export default App