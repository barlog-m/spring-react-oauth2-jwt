import "../../css/spinner.css";

import React from "react";
import PropTypes from "prop-types";

const Spinner = props => (
	<div className="loading" style={{visibility: !props.visible && "hidden"}}>
		Загрузка&#8230;</div>
);

Spinner.propTypes = {
	visible: PropTypes.bool.isRequired
};

export default Spinner;
