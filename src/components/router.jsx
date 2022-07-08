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
                    <Route path="/delivery_app" element={<Home />} />
                    <Route path="/delivery_app/brands" element={<Brands />} />
                    <Route path="/delivery_app/brands/:brandname" element={<BrandStore />} />
                    <Route path="/delivery_app/cart" element={<Cart />} />
                </Routes>
            </Router>
        </div>
    )
}


export default App