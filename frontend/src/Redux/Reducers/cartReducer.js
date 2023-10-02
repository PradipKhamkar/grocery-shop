import {
  ADD_TO_CART,
  CLEAR_CART_ITEM,
  REMOVE_CART_ITEM,
} from "../Constants/cartConstants";

export const myCartProductReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const isItemInCart = state.cartItems.find((item) => {
        return item.id === action.payload.id;
      });
      if (isItemInCart) {
        state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = action.payload.quantity;
          }
        });
        return {
          ...state,
        };
      } else {
        state.cartItems.push(action.payload);
        return {
          ...state,
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload),
        ],
      };

    case CLEAR_CART_ITEM:
      return {
        cartItems: [],
      };

    default:
      return state;
  }
};
