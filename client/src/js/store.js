import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { hashHistory } from "react-router";
import { routerMiddleware } from 'react-router-redux';


import reducer from "./reducers";

const routingMiddleware = routerMiddleware(hashHistory);

const middleware = applyMiddleware(promise(), thunk, logger(), routingMiddleware);

export default createStore(reducer, middleware);