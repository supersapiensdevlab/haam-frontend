import { actionTypes } from "../constants/actionTypes";

export const getType = (type) => {
  return {
    type: actionTypes.GET_TYPE,
    payload: type,
  };
};

export const getCategory = (category) => {
  return {
    type: actionTypes.GET_CATEGORY,
    payload: category,
  };
};
