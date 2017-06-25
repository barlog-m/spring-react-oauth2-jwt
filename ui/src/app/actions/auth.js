import {push} from "react-router-redux";

import {requestToken} from "../token/token";
import * as app from "./app";

import * as types from "./types";

export const logIn = payload => ({
	type: types.AUTH_LOG_IN,
	payload
});

export const logOut = () => ({
	type: types.AUTH_LOG_OUT
});

export const load = () => ({
	type: types.AUTH_STATE_LOAD
});

export const save = payload => ({
	type: types.AUTH_STATE_SAVE,
	payload
});

export const clear = () => ({
	type: types.AUTH_STATE_CLEAR,
});

export const badCredentials = () => ({
	type: types.AUTH_BAD_CREDENTIALS
});

export const badCredentialsClear = () => ({
	type: types.AUTH_BAD_CREDENTIALS_CLEAR
});

export const doLogIn = (username, password, route) => dispatch => {
	console.debug("do log-in");

	return requestToken(username, password)
		.then(response => {
			dispatch(save(response));
			dispatch(push(route));
		})
		.catch(error => {
			if (error) {
				console.debug("log-in error", error);
				if (error.code === 400) {
					dispatch(badCredentials());
				} else {
					dispatch(app.error(error));
				}
			}
		});
};

export const doLogOut = () => dispatch => {
	console.debug("do log-out");

	dispatch(logOut());
	dispatch(clear());
	dispatch(push("log-in"));
};
