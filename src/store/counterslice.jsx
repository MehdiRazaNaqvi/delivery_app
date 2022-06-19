import { createSlice } from '@reduxjs/toolkit'

// import { database } from "../firebase/firebase";

// import { set, ref, onValue, remove } from 'firebase/database';





const initialState = {

  brands: [

    { brand: 'Olivia', products: [{ name: "ball", price: "1000" }, {}, {}] },
    { brand: 'J', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Gul Ahmed', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Dalda', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Dairy', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Hp', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Dell', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Pearls', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Samsung', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Hemani', products: [{ name: "kurta", price: "1000" }, {}, {}] },
    { brand: 'Ponds', products: [{ name: "kurta", price: "1000" }, {}, {}] },

  ]

}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {





  },
})




export const { } = counterSlice.actions

export default counterSlice.reducer