import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import FooRow from "../components/foo/row";

const Foo = props => (
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
				props.foo.map(foo => (
					<FooRow key={foo.id} id={foo.id} value={foo.value} message={foo.message}/>
				))
			}
			</tbody>
		</table>
	</div>
);

Foo.propTypes = {
	foo: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	foo: state.foo
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Foo);
