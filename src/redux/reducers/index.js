import { combineReducers } from "redux";
import { customerReducer } from "./customerReducers";
import { productReducer } from "./productReducers";
import { userReducer } from "./userReducers";
import { optionsReducer } from "./optionsReducers";
export default combineReducers({
  allCustomers: customerReducer,
  allProducts: productReducer,
  user:userReducer,
  options: optionsReducer,
});
