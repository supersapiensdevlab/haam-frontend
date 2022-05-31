import { actionTypes } from "../constants/actionTypes";

export const registerUser = (products) => {
  return {
    type: actionTypes.REGISTER_USER,
    payload: products,
  };
};

export const getUser = (userdata) => {
  return {
    type: actionTypes.GET_USER,
    payload: userdata,
  };
};

export const setUser = (userdata) => {
  return {
    type: actionTypes.SET_USER,
    payload: userdata,
  };
};
