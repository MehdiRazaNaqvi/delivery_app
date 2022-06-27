
import { useSelector } from "react-redux"

const App = () => {


    const count = useSelector(state => state.counter)




    return (

        count.cart.map((v, i) => (

            <div key={i} >
                {v}
            </div>
        ))

    )

}



export default App