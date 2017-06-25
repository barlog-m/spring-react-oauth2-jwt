import * as auth from "./actions/auth";

/** Return function with two parameters for call when onEnter router event
 * @param {object} store - Redux Store
 * @param {function} action - Closure function call after authentication success
 */
const authRequired = (store, action) =>
	(nextState, replace) => {
		store.dispatch(auth.load());

		if (!store.getState().user.isAuthenticated) {
			replace({
				pathname: "/log-in",
				state: { nextPathname: nextState.location.pathname }
			});
		} else {
			if (action !== void 0) {
				action(nextState, replace);
			}
		}
	};

export default authRequired;
