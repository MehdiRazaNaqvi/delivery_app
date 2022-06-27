import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./App"
import Brands from "./brands"

import BrandStore from "./brandstore"

import Cart from "./cart"

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/brands/:brandname" element={<BrandStore />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </div>
    )
}


export default App