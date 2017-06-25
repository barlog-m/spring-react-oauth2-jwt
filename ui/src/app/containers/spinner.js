import "../../css/spinner.css";

import React from "react";
import {connect} from "react-redux";

const Spinner = props => (
	<div className="loading"
		 style={{visibility: !props.busy && "hidden"}}>
		Loading&#8230;
	</div>
);

const mapStateToProps = state => ({
	busy: state.app.busy
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
