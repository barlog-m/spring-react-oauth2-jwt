import React, {Component, PropTypes} from "react";

import Link from "react-router/lib/Link";
import IndexLink from "react-router/lib/IndexLink";
import withRouter from "react-router/lib/withRouter";

class NavItem extends Component {
	render() {
		const {router, routes, index, to, children, params, location, ...props} = this.props;

		let isActive;

		if (router.isActive("/", true) && index) {
			isActive = true;
		}
		else {
			isActive = router.isActive(to);
		}

		const LinkComponent = index ? IndexLink : Link;

		return (
			<li className={isActive ? "active" : ""}>
				<LinkComponent to={to} {...props}>{children}</LinkComponent>
			</li>
		);
	}
}

export default withRouter(NavItem);
