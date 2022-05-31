import { combineReducers } from "redux";
import { customerReducer } from "./customerReducers";
import { productReducer } from "./productReducers";
import { userReducer } from "./userReducers";
export default combineReducers({
  allCustomers: customerReducer,
  allProducts: productReducer,
  user:userReducer
});
