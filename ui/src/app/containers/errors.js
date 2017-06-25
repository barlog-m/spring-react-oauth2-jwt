import React from "react";
import {connect} from "react-redux";
import * as errors from "../actions/errors";

const Errors = props => (
	<div className="container">
		<div className="btn-toolbar pagination-centered">
			<button className="btn btn-default" onClick={props.bad}>400</button>
			<button className="btn btn-default" onClick={props.timeout}>Timeout</button>
		</div>
	</div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	bad: () => dispatch(errors.bad()),
	timeout: () => dispatch(errors.timeout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
