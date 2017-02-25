import React, {PropTypes} from "react";

const BarRow = props => (
	<tr>
		<td>{props.id}</td>
		<td>{props.value}</td>
		<td>{props.message}</td>
	</tr>
);

BarRow.propTypes = {
	id: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired
};

export default BarRow;
