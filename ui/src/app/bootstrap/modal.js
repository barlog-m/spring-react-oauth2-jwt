import "../../css/modal.css";

import React from "react";

const Modal = props => (
	<div className={props.show ? visible() : hidden()}>
		{props.children}
	</div>
);

const visible = () => {
	document.body.className = "modal-open";
	return "modal modal-visible";
};

const hidden = () => {
	document.body.className = "";
	return "modal modal-hidden";
};

export default Modal;
