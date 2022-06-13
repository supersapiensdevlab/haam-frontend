import { actionTypes } from "../constants/actionTypes";

export const getOrders = (orders) => {
  return {
    type: actionTypes.GET_ORDERS,
    payload: orders,
  };
};

