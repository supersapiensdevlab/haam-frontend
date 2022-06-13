import { actionTypes } from "../constants/actionTypes";

const initialState = {
 orders:[]
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    default:
      return state;
  }
};
