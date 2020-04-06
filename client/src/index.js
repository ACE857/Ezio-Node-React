import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ReactDom from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("stripe key ", process.env.REACT_APP_STRIPE_KEY);
console.log("env is", process.env.NODE_ENV);
