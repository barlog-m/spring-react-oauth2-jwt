import * as types from "../actions/types";
import * as auth from "../actions/auth";

const authState = store => next => action => {
	console.debug("auth state middleware", action);

	switch (action.type) {
		case types.AUTH_STATE_LOAD:
			const token = localStorage.getItem("access_token");
			if (token && token.length > 0) {
				return next(auth.logIn(token));
			} else {
				return next(auth.logOut());
			}
			break;
		case types.AUTH_STATE_SAVE:
			const access_token = action.payload.access_token;
			const refresh_token = action.payload.refresh_token;
			localStorage.setItem("access_token", access_token);
			localStorage.setItem("refresh_token", refresh_token);
			return next(auth.logIn(access_token));
			break;
		case types.AUTH_STATE_CLEAR:
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			return next(auth.logOut());
			break;
	}
	return next(action);
};

export default authState;
