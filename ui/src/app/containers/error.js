import React from "react";
import {connect} from "react-redux";
import isEmpty from "lodash.isempty";

import Modal from "../bootstrap/modal";

import * as app from "../actions/app";

const Error = props => (
	<Modal show={!isEmpty(props.error)}>
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button"
							className="close"
							onClick={props.close}>
						<span>&times;</span>
					</button>
					<h4 className="modal-title">
						Error
					</h4>
				</div>
				<div className="modal-body">
					<div style={{textAlign: "center"}}>
						<p>{props.error}</p>
					</div>
				</div>
				<div className="modal-footer">
					<button type="button"
							className="btn btn-primary"
							onClick={props.close}>
						Close
					</button>
				</div>
			</div>
		</div>
	</Modal>
);

const mapStateToProps = state => ({
	error: state.app.error
});

const mapDispatchToProps = dispatch => ({
	close: () => dispatch(app.ready())
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
