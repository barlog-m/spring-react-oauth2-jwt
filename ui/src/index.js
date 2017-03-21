import "./css/app.css";
import "./css/bootstrap.css";

import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import {Router, useRouterHistory} from "react-router";
import {createHistory} from "history";
import {
	syncHistoryWithStore,
	routerReducer,
	routerMiddleware
} from "react-router-redux";

import reducers from "./app/reducers";
import createRoutes from "./app/routes";
import authStateMiddleware from "./app/middleware/auth-state";

const rootReducer = combineReducers({
	...reducers,
	routing: routerReducer
});

const customizedHistory = useRouterHistory(createHistory)({
	basename: "/ui"
});

const middleware = applyMiddleware(
	routerMiddleware(customizedHistory),
	thunkMiddleware,
	authStateMiddleware
);

const store = createStore(rootReducer, middleware);

const history = syncHistoryWithStore(customizedHistory, store);

const routes = createRoutes(store);

render(
	<Provider store={store}>
		<Router routes={routes} history={history}/>
	</Provider>,
	document.getElementById("root")
);
