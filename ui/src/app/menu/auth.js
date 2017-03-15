import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import * as auth from "../actions/auth";

const AuthMenu = props => {
	return (
		<ul className="nav navbar-nav navbar-right">
			{props.isAuthenticated && <UserLink name={props.name}/>}
			{
				!props.isAuthenticated ?
					<LogInAction /> :
					<LogOutAction onClick={props.onLogOutClick}/>
			}
		</ul>
	);
};

const UserLink = props => (
	<li>
		<p className="navbar-text">{props.name}</p>
	</li>
);

const LogInAction = props => (
	<li>
		<Link to="log-in">
			<span className="glyphicon glyphicon-log-in"/>
		</Link>
	</li>
);

const LogOutAction = props => (
	<li>
		<a href="" onClick={props.onClick}>
			<span className="glyphicon glyphicon-log-out"/>
		</a>
	</li>
);

const mapStateToProps = state => ({
	name: state.user.name,
	isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	onLogOutClick: (e) => {
		e.preventDefault();
		dispatch(auth.doLogOut());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);
