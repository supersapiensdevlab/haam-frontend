import { actionTypes } from "../constants/actionTypes";

const initialState = {
  products: [],
  loading: true,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_PRODUCTS:
      return {
        state,
        products: payload,
        loading: false,
      };

    default:
      return state;
  }
};
