import React from "react";
import {Link, NavLink} from "react-router-dom";

import AuthMenu from "./auth";

const Menu = props => (
	<nav className="navbar navbar-default navbar-fixed-top">
		<div className="container">
			<div className="navbar-header">
				<Link className="navbar-brand" to="/">App</Link>
			</div>
			<div className="collapse navbar-collapse">
				<ul className="nav navbar-nav">
					<NavLink to="foo" activeClassName="active">Foo</NavLink>
					<NavLink to="bar" activeClassName="active">Bar</NavLink>
				</ul>
				<AuthMenu/>
			</div>
		</div>
	</nav>
);

export default Menu;
