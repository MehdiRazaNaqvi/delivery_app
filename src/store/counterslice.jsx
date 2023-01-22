import { createSlice } from '@reduxjs/toolkit'


// import { database } from "../firebase/firebase";

// import { set, ref, onValue, remove } from 'firebase/database';
import { current } from '@reduxjs/toolkit'



const initialState = {

  currentUser: { username: "none", photoURL: "", cart: [] }
  ,

  price: 0,

  brands: [

    // { brand: 'Olivia', pic: "https://oliviagreencamping.com/wp-content/uploads/2019/08/olivia_logo-07.png", products: [{ id: 1, name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "Moisturiser", price: "1000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "fairness creame", price: "2000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }, { name: "serum", price: "10000", img: "https://www.oliviacosmetics.net/web/files/2809766a93c111e89c8a124d46038552/7e29a018101b11ea9b7e0242b290a65e" }] },


  ]

  ,
  isloading: false,
  cart: [],
  users: [],



  charts_data: {

    brands_names: [],
    brands_prod: [],


    sales_names: [],
    sales_num: [],


    users_names: [],
    users_num: [],



  },


  search: { brandnavi: "", item: {} }


}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {



    current_user: (state, payload) => {

      state.currentUser.photoURL = payload.payload.photoURL
      state.currentUser.uid = payload.payload.uid
      state.currentUser.username = payload.payload.username


    },







    load_data: (state, payload) => {

      state.brands = payload.payload?.brands
      state.cart = payload.payload?.cart
      state.users = payload.payload?.users





      const brands_prod = [];
      const brands_names = [];


      const sales_names = [];
      const sales_num = [];



      const users_names = [];
      const users_num = [];


      state.brands?.map(v => brands_prod.push(v.products.length))
      state.brands?.map(v => brands_names.push(v.brand))

      state.cart?.map(v => { sales_names.push(v?.v?.name); })
      state.cart?.map(v => sales_num.push(1))


      state.users?.map(v => users_num.push(1))
      state.users?.map(v => users_names.push(v.username))






      state.charts_data.brands_names = brands_names
      state.charts_data.brands_prod = brands_prod


      state.charts_data.sales_names = sales_names
      state.charts_data.sales_num = sales_num


      state.charts_data.users_names = users_names
      state.charts_data.users_num = users_num







    },






    add_cart: (state, payload) => {

      state.currentUser.cart.push(payload.payload)
      state.price = state.price + parseInt(payload.payload.price)

    },





    logout_local: (state) => {
      localStorage.removeItem("delivery-user")
      state.currentUser = { username: "none", photoURL: "", cart: [] }
    },






    filter_brand: (state, payload) => {


      const search = (v, r) => {

        state.search.brandnavi = v.brand
        state.search.item = r



      }



      state.brands.map(v => v.products.map(r => r.name.toLowerCase() == payload.payload.toLowerCase() ? search(v, r) : console.log("nae hai")))



    },






    voice_add_cart: (state, payload) => {






      const add_to_cart = (v, r) => {


        const data = { v: current(r), brandkaname: v.brand }


        state.currentUser.cart.push(r)
        localStorage.setItem("delivery-user", JSON.stringify(state.currentUser))



        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*'
        }

        fetch("https://emartjs.herokuapp.com/add_to_cart", {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data)
        })




      }





      state.brands.map(v => v.products.map(r => r.name.toLowerCase() == payload.payload.toLowerCase() ? add_to_cart(v, r) : console.log("nae hai")))



    },




    remove_from_cart: (state, payload) => {
      state.currentUser.cart = state.currentUser.cart.filter((v, i) => i != payload.payload.i)
      state.price = state.price - payload.payload.v.price
      // state.price = 0

    },





    amount_paid: (state, payload) => {

      state.price = 0
      state.currentUser.cart = []

    },


  },
})





export const { current_user, load_data, add_cart, logout_local, filter_brand, voice_add_cart, remove_from_cart, amount_paid } = counterSlice.actions

export default counterSlice.reducer