import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import BarRow from "../components/bar/row";

const Bar = props => (
	<div className="container">
		<table className="table table-striped">
			<thead>
			<tr>
				<th className="col-sm-1">ID</th>
				<th className="col-sm-2">Value</th>
				<th className="col-sm-9">Message</th>
			</tr>
			</thead>
			<tbody>
			{
				props.bar.map(b => (
					<BarRow key={b.id} id={b.id} value={b.value} message={b.message}/>
				))
			}
			</tbody>
		</table>
	</div>
);

Bar.propTypes = {
	bar: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	bar: state.bar
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
