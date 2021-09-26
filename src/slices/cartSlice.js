import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Actions
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id == action.payload.id
      );
      if (action.payload.quantity > 0) {
        if (index >= 0) {
          state.items[index].quantity += action.payload.quantity;
        } else {
          state.items = [...state.items, action.payload];
        }
      }
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...state.items];
      if (index >= 0) {
        //the item exists in basket.. need to remove it
        newCart.splice(index, 1); //(position, number of item to delete)
      } else {
        console.warn(
          `cant remove product(id: ${action.payload.id}) as its not in cart`
        );
      }
      state.items = newCart;
    },

    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id == action.payload.id
      );
      if (index >= 0) {
        if (action.payload.quantity > 0) {
          state.items[index].quantity = action.payload.quantity;
        } else {
          let newCart = [...state.items];
          newCart.splice(index, 1);
          state.items = newCart;
        }
      } else
        console.warn(
          `can't remove product ${action.payload.id} as it doesn't exist`
        );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

//Selectors - this is how we pull information from the global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectPrescribed = (state) =>
  state.cart.items.reduce(
    (prescribed, item) => prescribed || item.requirePrescription,
    false
  );
export default cartSlice.reducer;
