import "../../../css/log-in.css";

import React, {Component} from "react";
import {connect} from "react-redux";
import get from "lodash.get";

import BadCredentialsError from "./bad-credentials";
import * as auth from "../../actions/auth";

class LogIn extends Component {
	constructor(props) {
		super(props);

		if (process.env.NODE_ENV === "development") {
			this.state = {
				username: "user",
				password: "password"
			};
		} else {
			this.state = {
				username: "",
				password: ""
			};
		}
	}

	onLogInClick(e) {
		e.preventDefault();
		this.props.logIn(this.state.username,
			this.state.password, this.nextPathname());
	}

	onUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	onPasswordChange(e) {
		this.setState({password: e.target.value});
	}

	isUsernameValid() {
		return this.state.username.length > 0;
	}

	isPasswordValid() {
		return this.state.password.length > 0;
	}

	isValid() {
		return this.isUsernameValid() && this.isPasswordValid();
	}

	nextPathname() {
		return get(this.props.location, "state.nextPathname", "/");
	}

	render() {
		return (
			<div className="container">
				<BadCredentialsError/>
				<div className="center-block vertical-center log-in">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">Log In</h3>
						</div>
						<div className="panel-body">
							<form>
								<div className="form-group">
									<div className="input-group">
								<span className="input-group-addon">
									<span
										className="glyphicon glyphicon-user"/>
								</span>
										<input type="text"
											   className="form-control"
											   placeholder="Username"
											   autoFocus
											   value={this.state.username}
											   onChange={this.onUsernameChange.bind(this)}/>
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
								<span className="input-group-addon">
									<span
										className="glyphicon glyphicon-lock"/>
								</span>
										<input type="password"
											   className="form-control"
											   placeholder="Password"
											   value={this.state.password}
											   onChange={this.onPasswordChange.bind(this)}/>
									</div>
								</div>
								<button type="submit"
										className="btn btn-primary pull-right"
										disabled={!this.isValid()}
										onClick={this.onLogInClick.bind(this)}>
									Enter
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	location: ownProps.location
});

const mapDispatchToProps = dispatch => ({
	logIn: (username, password, route) =>
		dispatch(auth.doLogIn(username, password, route))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
