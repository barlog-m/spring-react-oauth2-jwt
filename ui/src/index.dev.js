import "bootstrap/dist/css/bootstrap.css";
import "./css/app.css";
import "./css/bootstrap.css";

import "react-hot-loader/patch";
import "webpack/hot/only-dev-server";
import "webpack-dev-server/client?http://localhost:8080";

import React from "react";
import {render} from "react-dom";
import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import {Router, browserHistory} from "react-router";
import {
	syncHistoryWithStore,
	routerReducer,
	routerMiddleware
} from "react-router-redux";

import reduxLogger from "redux-logger";
import {AppContainer} from "react-hot-loader";

import reducers from "./app/reducers";
import createRoutes from "./app/routes";

import authStateMiddleware from "./app/middleware/auth-state";

import "./mock";

const rootReducer = combineReducers({
	...reducers,
	routing: routerReducer
});

const middleware = applyMiddleware(
	routerMiddleware(browserHistory),
	thunkMiddleware,
	//reduxLogger,
	authStateMiddleware
);

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

render(
	<AppContainer>
		<Provider store={store}>
			<Router routes={routes} history={history}/>
		</Provider>
	</AppContainer>,
	document.getElementById("root")
);
