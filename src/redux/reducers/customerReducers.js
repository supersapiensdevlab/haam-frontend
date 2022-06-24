import { actionTypes } from "../constants/actionTypes";

const initialState = {
  customers: [],
  loading: true,
};

export const customerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false,
      };
    default:
      return state;
  }
};
