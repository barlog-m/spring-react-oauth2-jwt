import jwtDecode from "jwt-decode";

import * as types from "../actions/types";

const token2user = (token) => {
	try {
		return {
			...jwtDecode(token),
			isAuthenticated: true
		};
	} catch (e) {
		return {
			isAuthenticated: false
		};
	}
};

const user = (state = {isAuthenticated: false}, action) => {
	switch (action.type) {
		case types.AUTH_LOG_IN:
			return token2user(action.payload);
		case types.AUTH_LOG_OUT:
			return {
				isAuthenticated: false
			};
		case types.AUTH_BAD_CREDENTIALS:
			return {
				...state,
				isBadCredentials: true
			};
		case types.AUTH_BAD_CREDENTIALS_CLEAR:
			return {
				...state,
				isBadCredentials: false
			};
		default:
			return state;
	}
};

export default user;
