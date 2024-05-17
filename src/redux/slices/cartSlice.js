import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.data.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.data.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.data)); 
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.data)); 
    },
    updateCartItem: (state, action) => {
      const { id, qty } = action.payload;
      const itemInCart = state.data.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.qty = qty;
        localStorage.setItem("cart", JSON.stringify(state.data));
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
