import { createSlice } from '@reduxjs/toolkit'

// import { database } from "../firebase/firebase";

// import { set, ref, onValue, remove } from 'firebase/database';





const initialState = {

  currentUser: { username: "none", photoURL: "", cart: [] }
  ,

  brands: [

    // { brand: 'Olivia', pic: "https://oliviagreencamping.com/wp-content/uploads/2019/08/olivia_logo-07.png", products: [{ id: 1, name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'J', pic: "https://seeklogo.com/images/J/Junaid_jamshed-logo-D0EF421943-seeklogo.com.png", products: [{ id: 2, name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Gul Ahmed', pic: "https://logovectorseek.com/wp-content/uploads/2020/03/gul-ahmed-logo-vector.png", products: [{ id: 3, name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Dalda', pic: "https://climatelaunchpad.org/wp-content/uploads/2019/01/5.png", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Dairy', pic: "http://i2.wp.com/www.dairyproducts.it/eng/wp-content/uploads/2016/05/dairy-products.jpg?fit=1000%2C691", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Grocery', pic: "https://techcrunch.com/wp-content/uploads/2015/03/groceries-e1554037962210.jpg", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Olay', pic: "https://logos-world.net/wp-content/uploads/2020/11/Olay-Symbol.png", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

    // { brand: 'Ponds', pic: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/ac84d025156259.563424319264b.png", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },


    // { brand: 'Hemani', pic: "https://i.pinimg.com/originals/d3/41/91/d34191d9984fdf9444607026400a08d5.png", products: [{ name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },

  ]

  ,
  isloading: false,
  cart: [],
  users: []
}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {



    current_user: (state, payload) => {

      state.currentUser = payload.payload
      // console.log(payload.payload)


    }

    ,




    load_data: (state, payload) => {

      state.brands = payload.payload.brands
      state.cart = payload.payload.cart
      state.users = payload.payload.users



    },






    add_cart: (state, payload) => {

      state.currentUser.cart.push(payload.payload)
      localStorage.setItem("delivery-user", JSON.stringify(state.currentUser))

    },




    logout_local: (state) => {
      localStorage.removeItem("delivery-user")
      state.currentUser = { username: "none", photoURL: "", cart: [] }
    }




  },
})




export const { current_user, load_data, add_cart, logout_local } = counterSlice.actions

export default counterSlice.reducer