import { actionTypes } from "../constants/actionTypes";

export const registerCustomer = (customers) => {
  return {
    type: actionTypes.REGISTER_CUSTOMER,
    payload: customers,
  };
};

export const getCustomers = (customer) => {
  return {
    type: actionTypes.GET_CUSTOMER,
    payload: customer,
  };
};

export const setCustomers = (customer) => {
  return {
    type: actionTypes.SET_CUSTOMERS,
    payload: customer,
  };
};
