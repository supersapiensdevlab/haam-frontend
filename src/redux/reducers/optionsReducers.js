import { actionTypes } from "../constants/actionTypes";

const initialState = {
 type:[],
 category:[],
};

export const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_TYPE:
      return {
        ...state,
        type: payload,
      };
      case actionTypes.GET_CATEGORY:
        return {
          ...state,
          category: payload,
        };
    default:
      return state;
  }
};
