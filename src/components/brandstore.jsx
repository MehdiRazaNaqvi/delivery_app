import { useState } from "react";
import { useParams } from "react-router-dom"

import { useSelector } from "react-redux"


const App = () => {


    const d = useParams();

    const brandkaname = d.brandname


    const count = useSelector(state => state.counter)


    console.log(brandkaname)

    let product = {}

    count.brands.map((v) => v.brand.toLowerCase() === brandkaname.toLowerCase() ? product = v.products : null)


    console.log(product)



    return (

        <div>

            {product.map((v) => (
                <div>
                    {v.name}
                    {v.price}
                </div>
            ))}


        </div>
    )

}


export default App