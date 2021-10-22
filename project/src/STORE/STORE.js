import {createStore, combineReducers, applyMiddleware} from "redux";
import CardsReducer from "./CardsReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  forCards:CardsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
window.store = store;
