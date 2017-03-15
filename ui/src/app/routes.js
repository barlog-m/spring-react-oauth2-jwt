import React from "react";
import {connect} from "react-redux";

import {Switch, Route} from "react-router";

import authRequired from "./auth-required";
import * as foo from "./actions/foo";
import * as bar from "./actions/bar";

import NotFound from "./containers/404";
import LogIn from "./containers/auth/log-in";
import Foo from "./containers/foo";
import Bar from "./containers/bar";

const Routes = props => (
	<Switch>
		<Route path="/log-in" component={LogIn}/>
		<Route path="/foo"
			   component={Foo}
			   onEnter={props.onFooEnter}/>
		<Route path="/bar"
			   component={Bar}
			   onEnter={props.onBarEnter}/>
		<Route component={NotFound}/>
	</Switch>
);

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {isAuthenticated} = stateProps;
	const {dispatch} = dispatchProps;

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onFooEnter: () => dispatch(authRequired(isAuthenticated, () => foo.getList())),
		onBarEnter: () => dispatch(authRequired(isAuthenticated, () => bar.getList()))
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Routes);
