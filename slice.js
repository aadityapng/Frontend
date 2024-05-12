const toolkit = require("@reduxjs/toolkit");

const { configureStore, createSlice } = toolkit;

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

console.log("oncreate store :", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
});

const action1 = cartSlice.actions.addToCart({ id: 1, qty: 20 });
store.dispatch(action1);
const action2 = cartSlice.actions.addToCart({ id: 1, qty: 23 });
store.dispatch(action2);