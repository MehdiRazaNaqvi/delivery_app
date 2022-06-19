import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./App"
import Brands from "./brands"

import BrandStore from "./brandstore"



const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/brands/:brandname" element={<BrandStore />} />
                </Routes>
            </Router>
        </div>
    )
}


export default App