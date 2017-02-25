import "../../css/spinner.css";

import React, {PropTypes} from "react";

const Spinner = props => (
	<div className="loading" style={{visibility: !props.visible && "hidden"}}>
		Загрузка&#8230;</div>
);

Spinner.propTypes = {
	visible: PropTypes.bool.isRequired
};

export default Spinner;
