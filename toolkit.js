const toolkit = require("@reduxjs/toolkit");

const { configureStore, createAction, createReducer } = toolkit;

const addToCart = createAction("ADD_TO_CART");

const cartReducer = createReducer([], (builder) => {
  builder.addCase(addToCart, (state, action) => {
    state.push(action.payload);
  });
});

const login = createAction("CREATE_SESSION");

const loginReducer = createReducer({status: false}, (builder) => {
  builder.addCase(login, (state, action) => {
    state.status = true;
  });
});

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});
console.log("oncreate store :", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
});

const action1 = addToCart({ id: 1, qty: 20 });
store.dispatch(action1);

const action2 = addToCart({ id: 1, qty: 20 });
store.dispatch(action2);

//atau bisa juga
// store.dispatch(addToCart({ id: 1, qty: 20 }));

const action3 = login();
store.dispatch(action3);