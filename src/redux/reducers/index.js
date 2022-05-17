import { combineReducers } from "redux";
import { customerReducer } from "./customerReducers";
import { productReducer } from "./productReducers";

export default combineReducers({
  allCustomers: customerReducer,
  allProducts: productReducer,
});
