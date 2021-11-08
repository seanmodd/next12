import { combineReducers } from "redux";
import productsReducer from "./product";

export default combineReducers({
  products: productsReducer,
});
