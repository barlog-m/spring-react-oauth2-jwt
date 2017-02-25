import React from "react";
import {connect} from "react-redux";

import Modal from "../../bootstrap/modal";

import * as auth from "../../actions/auth";

const BadCredentialsError = props => (
	<Modal show={props.isBadCredentials}>
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
					<center><p>Wrong user name or password</p></center>
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
	isBadCredentials: state.user.isBadCredentials
});

const mapDispatchToProps = dispatch => ({
	close: () => {dispatch(auth.badCredentialsClear());}
});

export default connect(mapStateToProps, mapDispatchToProps)(BadCredentialsError);
