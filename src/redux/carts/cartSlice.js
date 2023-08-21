const { createSlice } = require("@reduxjs/toolkit");


const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers:{
        addtoCart:(state, action)=>{
            console.log(state);
            state.push(action.payload)
        },
        removeFromCart:(state, action)=>{
            return state.filter(item=> item._id !== action.payload)
        }
    }
})

export const {addtoCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;