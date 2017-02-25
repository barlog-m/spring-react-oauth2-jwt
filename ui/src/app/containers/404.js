import React from "react";

const NotFound = props => (
	<div className="container content-two-navbar">
		<div className="panel panel-danger">
			<div className="panel-heading clearfix">
				<h4 className="pull-left">
					404
				</h4>
				<button className="btn btn-default pull-right"
						onClick={props.goBack}>
					<span className="glyphicon glyphicon-remove"/>
				</button>
			</div>
			<div className="panel-body">
				<center>Not Found</center>
			</div>
		</div>
	</div>
);

export default NotFound;
