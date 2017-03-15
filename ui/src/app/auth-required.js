import * as auth from "./actions/auth";

/** Return function with two parameters for call when onEnter router event
 * @param {boolean} isAuthenticated - user authenticated state
 * @param {function} action - Closure function call after authentication success
 */
const authRequired = (isAuthenticated, action) => dispatch => {
	return (nextState, replace) => {
		dispatch(auth.load());

		if (!isAuthenticated) {
			replace({
				pathname: "/log-in",
				state: { nextPathname: nextState.location.pathname }
			});
		} else {
			if (action !== void 0) {
				dispatch(action(nextState, replace));
			}
		}
	};
};

export default authRequired;
