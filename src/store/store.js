import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import initialState from "./initialState";
//
// const persistedState = localStorage.getItem("reduxState")
//   ? JSON.parse(localStorage.getItem("reduxState"))
// 	: initialState;

const store = createStore(reducer, initialState, applyMiddleware(thunk));

// store.subscribe(() => {
// 	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// })

export default store;