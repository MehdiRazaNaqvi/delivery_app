import { useParams } from "react-router-dom"




import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import "../css/dashboard.css"

import Navbar from "../components/navbar"

import { Bar, Pie, Line, Doughnut, Radar, PolarArea, Scatter, Bubble } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {api_url , headers} from "../config/api"










const App = () => {


    const count = useSelector(state => state.counter)







    // const [logout, setlogout] = useState(false)




    const brandn = useParams()


    let brand = { products: [] }

    count.brands.map((v) => v.brand.toLowerCase() === brandn.v.toLowerCase() ? brand = v : null)




    let revenue = 0;
    let i = 0;



    let total_revenue = 0;
    let j = 0;





    const calculate_revenue = (v) => {
        revenue = revenue + parseInt(v.v.price);
        i = i + 1
    }



    const calculate_total_revenue = (v) => {
        total_revenue = total_revenue + parseInt(v.v.price)
        j = j + 1


    }



    {
        count.cart.map(v => brandn.v.toLocaleLowerCase() == v.brandkaname.toLocaleLowerCase() ? calculate_revenue(v) : calculate_total_revenue(v))
    }





    const [form_data, setform_data] = useState({ name: "", price: Number, img: "", brand: brandn.v })



    const [userdata, setuserdata] = useState({


        labels: [`${brandn.v}`, "Others"],

        datasets: [{
            label: "brands", data: [revenue, total_revenue], backgroundColor: ["rgb(250, 234, 99)", "lightsalmon", "lightgrey", "lightgreen"], barPercentage: 0.5,
            barThickness: 20,

            tension: 0.4,

        }]
    })





    const [userdata1, setuserdata1] = useState({


        labels: [`${brandn.v}`, "Others"],

        datasets: [{
            label: "brands", data: [brand.products.length, j], backgroundColor:  ["rgb(250, 234, 99)", "lightgreen"], barPercentage: 0.5,
            barThickness: 20,

            tension: 0.4,

        }]
    })




    const [userdata2, setuserdata2] = useState({


        labels: [`${brandn.v}`, "Others"],

        datasets: [{
            label: "brands", data: [i, j], backgroundColor: ["#EBBD64", "skyblue"], barPercentage: 0.5,
            barThickness: 20,

            tension: 0.4,

        }]
    })




    const add_product = () => {




        fetch(`${api_url}/add-prod`, {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(form_data)

        })
            .then((d) => alert("Added"))



    }




    return (




        <div className="dashboard_base">

            <Navbar />



            <div className="line">


                <div className="box box-pic">



                    <img src={brand.pic} className="pic-fix" />
                </div>



                <div className="box">

                    <span className="sp"><h1 className="dash-main">{revenue}</h1>earned</span>
                    <span className="bp">

                        <Doughnut
                            className="actual_bar"
                            data={userdata}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>




                <div className="box dosra">

                    <span className="sp"><h1 className="dash-main">{brand.products.length}</h1>products</span>
                    <span className="bp">

                        <Pie
                            className="actual_bar"
                            data={userdata1}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>



                <div className="box tesra">

                    <span className="sp"><h1 className="dash-main">{i}</h1> items sold</span>
                    <span className="bp">

                        <PolarArea
                            className="actual_bar"
                            data={userdata2}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>



                <div className="box chota">

                    <span className="sp"><h1 className="dash-main">{ ((i/j)*100).toFixed(0)} <p className="per_sign">%</p></h1> market share</span>
                    <span className="bp">

                        <Doughnut
                            className="actual_bar"
                            data={userdata2}



                            height='50vh'
                            width='50vw'
                            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}


                        />
                    </span>
                </div>






            </div>




            <div className="form">

                <h6>Add your product</h6>

                <input type="text" placeholder="Product name" onChange={(e) => setform_data({ ...form_data, name: e.target.value })} className="form-control" />
                <input type="text" placeholder="Price" onChange={(e) => setform_data({ ...form_data, price: e.target.value })} className="form-control" />
                <input placeholder="Image url" onChange={(e) => setform_data({ ...form_data, img: e.target.value })} type="text" className="form-control" />
                <button className="btn btn-primary add-btn" onClick={() => add_product()}>Add Product</button>

            </div>





        </div>


    )

}


export default App