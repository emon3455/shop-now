import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./carts/cartSlice";


const store = configureStore({
    reducer:{
        cart: cartSlice
    }
})

export default store;