import { actionTypes } from "../constants/actionTypes";

export const registerUser = (products) => {
  return {
    type: actionTypes.REGISTER_USER,
    payload: products,
  };
};

export const getUser = (product) => {
  return {
    type: actionTypes.GET_USER,
    payload: product,
  };
};

export const setUser = (product) => {
  return {
    type: actionTypes.SET_USER,
    payload: product,
  };
};
