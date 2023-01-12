import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../Constants/cartConstants";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/getSingleProduct/${id}`);
  //console.log("CART ACTION CALL");
  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: data.product._id,
      name: data.product.name,
      rate: data.product.rate,
      stocks: data.product.stocks,
      kilogramOption: data.product.kilogramOption,
      image: data.product.url,
      quantity,
    },
  });
  localStorage.setItem(
    "userCart",
    JSON.stringify(getState().userCart.cartItems)
  );
};

export const removeCartItemAction = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });
  localStorage.setItem(
    "userCart",
    JSON.stringify(getState().userCart.cartItems)
  );
};
