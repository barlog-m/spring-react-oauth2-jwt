import React, {PropTypes} from "react";
import {connect} from "react-redux";

import Routes from "./routes";
import Spinner from "./components/spinner";
import Error from "./containers/error";
import Menu from "./menu/menu";

const App = props => (
	<div>
		<Routes/>
		<Spinner visible={props.busy}/>
		<Error/>
		<Menu/>
		{props.children}
	</div>
);

App.propTypes = {
	busy: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	busy: state.global.busy
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
