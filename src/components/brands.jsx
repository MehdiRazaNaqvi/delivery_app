import "../css/brands.css"
import { useNavigate } from "react-router-dom"

const App = () => {


    const navigate = useNavigate();

    const store = [
        "Olivia",
        "Hemani",
        "J",
        "Ponds",
        "HP",
        "Dell",
        "Samsung",
        "Dairy",
        "Pearls",
        "Gul Ahmed",
        "Dalda",

    ]

    return (
        <div className="storespage">


            <div className="divu" >
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/grocery.jpg" />
            </div>




            <div className="divu" >
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/food.jpg" />
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
            </div>



            
            <div className="divu" >
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/pharma.jpg" />
            </div>


            <div className="divu" >
                <img className="half_img" src="https://www.cheetay.pk/static/images/newLandingPage/dairy.jpg" />
                <span className="half_img span_offer " > Get instant delivery all over pakistan <button className="btn btn-outline-warning">Shop Now!</button> </span>
            </div>




            {/* 
            <div className="grid" >

                {store.map((v, i) => (

                    <div key={i} onClick={() => navigate(`/brands/${v}`)} className="card" >






                        <img src='data:image/png;base64,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' className="card-img" />
                        <div className="card-img-overlay">
                            <h6 className="card-title">{v}</h6>
                            <h6 className='price'>Rs. 200</h6>
                        </div>

                    </div>

                ))}

            </div> */}




        </div>
    )

}


export default App