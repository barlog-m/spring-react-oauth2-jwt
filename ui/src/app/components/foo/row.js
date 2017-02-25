import React, {PropTypes} from "react";

const FooRow = props => (
	<tr>
		<td>{props.id}</td>
		<td>{props.value}</td>
		<td>{props.message}</td>
	</tr>
);

FooRow.propTypes = {
	id: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired
};

export default FooRow;
