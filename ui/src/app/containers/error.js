import React from "react";
import {connect} from "react-redux";
import isEmpty from "lodash.isempty";

import Modal from "../bootstrap/modal";

import * as global from "../actions/global";

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
					<div className="form-horizontal">
						<div className="form-group">
							<label className="control-label col-sm-3">Code</label>
							<div className="col-sm-9">
								<p className="form-control-static">
									{props.error.code}
								</p>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-3">Message</label>
							<div className="col-sm-9">
								<p className="form-control-static">
									{props.error.message}
								</p>
							</div>
						</div>
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
	error: state.global.error
});

const mapDispatchToProps = dispatch => ({
	close: () => dispatch(global.ready())
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
