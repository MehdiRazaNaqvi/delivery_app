import { useParams } from "react-router-dom"
import { Spinner } from "reactstrap";



import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import "../css/dashboard.css"

import Navbar from "../components/navbar"

import { Bar, Pie, Line, Doughnut, Radar, PolarArea, Scatter, Bubble } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { api_url, headers } from "../config/api"
import { toast } from "react-toastify";
import { load_data } from "../store/counterslice";

import { useRef } from "react";
import axios from "axios";
import { Input } from "reactstrap";
import { useNavigate } from "react-router-dom";






const App = () => {


    const count = useSelector(state => state.counter)



    // const [logout, setlogout] = useState(false)




    const brandn = useParams()


    // const [brand , setBrand] = useState({ products: [] })

    let brand = { products: [] }

    count.brands.map((v) => v._id === brandn.v ? brand = v : null)





    let revenue = 0;
    let i = 0;



    let total_revenue = 0;
    let j = 0;



    const navigate = useNavigate()


    const calculate_revenue = (v) => {
        revenue = revenue + parseInt(v.v.price);
        i = i + 1
    }



    const calculate_total_revenue = (v) => {
        total_revenue = total_revenue + parseInt(v.v?.price)
        j = j + 1


    }



    {
        count.cart.map(v => brandn.v == v.brandId ? calculate_revenue(v) : calculate_total_revenue(v))
    }



    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



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
            label: "brands", data: [brand.products.length, j], backgroundColor: ["rgb(250, 234, 99)", "lightgreen"], barPercentage: 0.5,
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


    const inputFile = useRef(null)



    const gett = (param) => {

        setLoading(true)

        const ready = (r, param) => {

            dispatch(load_data(r[0]))
            setLoading(false)


            {
                param == "remove" ?
                    toast.success("Product Removed", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    :
                    toast.success("Product Added", {
                        position: toast.POSITION.TOP_CENTER
                    });
            }


            // {
            //     param != "remove" && (
            //         brand.products = brand.products.push(form_data))
            // }

            // brand.products = [...brand.products, { name: form_data.name, img: form_data.img, brand: form_data.brand, price: form_data.price }]
            // setBrand({ ...brand, products: [...brand.products, form_data] })
            setform_data({ name: "", price: Number, img: "", brand: brandn.v })




        }


        // fetch('https://bhaiyya-server.herokuapp.com/getdata', {

        fetch(`${api_url}/getdata`, {

            method: 'GET',
            headers: headers

        })
            .then((d) => d.json())
            .then((r) => ready(r, param))




    }



    const add_product = () => {


        // setLoading(true)

        fetch(`${api_url}/add-prod`, {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(form_data)

        })
            .then((d) => d.json())
            .then((s) => s.type = "success" ? gett() : toast.error("Something went wrong"))
            // .then(res => console.log(res))
            .catch((err) => toast.error("Network Problem"))





    }




    const uploadMedia = ({ data }) => {






        fetch(`${api_url}/uploadFile`, {

            method: 'POST',
            // headers: headers,
            body: data

        })


            .then((d) => d.json())
            .then((r) => r.type == "success" && setform_data({ ...form_data, img: r.data }))

            .catch(err => console.log(err))



    }





    const send_pic = (e) => {

        e.preventDefault()

        const file = e.target.files[0];


        const formData = new FormData

        formData.append("file", file)


        uploadMedia({ data: formData })

    }




    const deleteBrand = () => {
        setLoading(true)

        axios.post(`${api_url}/delete_brand`, {
            id: brandn.v
        })

            .then(res => { setLoading(false); toast.success("Your Brand is Deleted"); navigate("/delivery_app") })
            .catch(err => { setLoading(false); toast.error("Something went wrong") })
    }






    const remove_item = (e) => {

        // console.log(brand)
        setLoading(true)
        fetch(`${api_url}/dlt-prod`, {

            method: 'POST',
            headers: headers,
            body: JSON.stringify({ e, brand })

        })
            .then((d) => d.json())

            .then((s) => s.type == "success" ? gett("remove") : toast.error("Something went wrong"))
            .catch((err) => console.log(err))

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

                    <span className="sp"><h1 className="dash-main">{((i / j) * 100).toFixed(0)} <p className="per_sign">%</p></h1> market share</span>
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

                <h3 style={{ margin: "1.5rem" }}>Add your product</h3>

                <form style={{ "margin": "0%", "padding": "0%", "width": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "1.5rem" }} action="" onSubmit={(e) => { e.preventDefault(); add_product() }}>

                    <Input size="lg" value={form_data.name} required type="text" placeholder="Product name" onChange={(e) => setform_data({ ...form_data, name: e.target.value })} className="form-control" />
                    <Input size="lg" value={form_data.price} required type="text" placeholder="Price" onChange={(e) => setform_data({ ...form_data, price: e.target.value })} className="form-control" />
                    {/* <input value={form_data.img} required placeholder="Image url" onChange={(e) => setform_data({ ...form_data, img: e.target.value })} type="text" className="form-control" /> */}
                    <Input size="lg" required className="form-control" onChange={(e) => send_pic(e)} type='file' id='file' ref={inputFile} />

                    <button disabled={loading} className="btn btn-primary add-btn" type="submit">{loading ? <Spinner color="light" size="lg" animation="border"></Spinner> : "Add Product"} </button>
                    <button onClick={() => { deleteBrand() }} disabled={loading} className="btn btn-danger add-btn" type="button">{loading ? <Spinner color="light" size="lg" animation="border"></Spinner> : "Delete Brand"} </button>

                </form>

            </div>




            {
                brand.products.length > 0 ?

                    <div className="profile_l">


                        {brand.products.map((v, i) => (


                            <div key={i} className="card-product">

                                <img src={`${api_url}/images/${v.img}`} className="card-img-product" />

                                <div className="card-img-overlay-product">
                                    <h6 className={v.name == count.search.item.name ? "card-title-product searched" : "card-title-product"} >{v.name}</h6>
                                    <h6 className='price-product'>Rs. {v.price}</h6>
                                    <button disabled={loading} className="btn btn-outline-dark btn-small" onClick={() => remove_item(v)} >{loading ? <Spinner color="dark" size="sm" animation="border"></Spinner> : "Remove"} </button>

                                </div>

                            </div>

                        ))




                        }

                    </div>

                    :

                    <div style={{ width: "100%", textAlign: "center", color: "gray", fontSize: "1rem", fontWeight: 500 }}>No Products to Show</div>

            }

        </div>


    )

}


export default App