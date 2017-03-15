import React from "react";

import {Route, IndexRedirect} from "react-router";

import axiosConfig from "./config/axios";

import authRequired from "./auth-required";
import * as foo from "./actions/foo";
import * as bar from "./actions/bar";

import App from "./app";
import NotFound from "./containers/404";
import LogIn from "./containers/auth/log-in";
import Foo from "./containers/foo";
import Bar from "./containers/bar";

const createRoutes = store => {
	const dispatch = store.dispatch;
	axiosConfig(dispatch);

	return (
		<Route path="/" component={App}>
			<IndexRedirect to="foo"/>
			<Route path="log-in" component={LogIn}/>
			<Route path="foo"
				   component={Foo}
				   onEnter={authRequired(store, () => dispatch(foo.getList()))}/>
			<Route path="bar"
				   component={Bar}
				   onEnter={authRequired(store, () => dispatch(bar.getList()))}/>
			<Route path="*" component={NotFound}/>
		</Route>
	);
};

export default createRoutes;
