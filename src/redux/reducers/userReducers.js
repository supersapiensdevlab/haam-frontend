
import { actionTypes } from "../constants/actionTypes";


const initialState = {
    user: null,
    loading: false,
    tokens:null,
  };

  export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case actionTypes.SET_USER:
        return {
          user: payload.user,
          loading: false,
          tokens:{accessToken:payload.accessToken,refreshToken:payload.refreshToken}
        };
      default:
        return state;
    }
  };