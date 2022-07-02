import "../css/Home.css"
import mainimg from "../css/imm.jpg"
import undraw1 from "../css/undraw1.svg"


import { useNavigate } from "react-router-dom"

const App = () => {
    const navigate = useNavigate()

    const fetching = () => {

        const   headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        fetch('http://localhost:4000/getmongo', {
            method: 'get',
            headers : headers
        }).then((data) => data.json())
        .then((r) => console.log(r))
    }



    


    return (
        <div className="homescreen" >


            <div className="part1">
                <h1>We deliver rich and fast</h1>



                <button onClick={() => navigate("/brands")} className="btn btn-outline-light visit">Visit your favorite stores</button>


                <span>
                    <button className="btn_normal btn btn-outline-dark">Continue as a Rider</button>
                    <button className="btn_normal btn btn-outline-dark">Join us</button>
                    <button onClick={() => fetching()} className="btn_normal btn btn-outline-dark">fetch</button>
                </span>

            </div>





            <div className="part2">




                {/* <img className="main_img" src="https://media.istockphoto.com/vectors/circle-from-food-doodles-vector-id973213364?k=20&m=973213364&s=612x612&w=0&h=zUNIFvTbx6dvXILF0lMR0IoCpgOjbrfQ1n3VVn-D9Cs=" alt="" /> */}


                <img className="main_img" src={mainimg} />



                {/* <img className="main_img" src="https://as2.ftcdn.net/v2/jpg/01/95/42/25/1000_F_195422548_91V552CmgxX8YsXJ4pgCkv2yQJniFFHF.jpg"/>  */}


                {/* <img className="main_img" src="https://thumbs.dreamstime.com/b/grocery-bag-graphic-isolated-black-white-sketch-illustration-vector-grocery-bag-graphic-isolated-black-white-sketch-vector-160443082.jpg" /> */}


                {/* <img className="main_img" src="https://media.istockphoto.com/vectors/grocery-food-chalk-white-icons-set-on-black-background-vector-id1255003973?k=20&m=1255003973&s=612x612&w=0&h=dauEy32hs4R0QXjFVio9t-nV5WQ3ofCwikYiNh79KWM="  /> */}


                {/* <img src="https://media.istockphoto.com/vectors/groceries-category-chalk-white-icons-set-on-black-background-vector-id1255003962?k=20&m=1255003962&s=612x612&w=0&h=VDmKozUL-OD7CNqHdUPpGCJkFeEiIZc7p2gBvnD2fS8=" className="main_img" /> */}



                {/* <img className="main_img" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b992ed47907367.58c7cecf372e0.jpg"  /> */}


                {/* <img className="main_img" src={undraw1}  /> */}

            </div>











        </div>
    )

}


export default App