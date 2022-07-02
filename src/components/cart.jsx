
import { useSelector } from "react-redux"
// import "../css/cart.css"

const App = () => {


    const count = useSelector(state => state.counter)



    

    return (

        <div className="cart_main">




            {count.cart.map((v, i) => (

                <div className="cart_item" key={i} >
                    {v}
                </div>

            ))
            }
        </div>

    )

}



export default App