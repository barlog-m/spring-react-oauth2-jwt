import URI from "urijs";
import {push} from "react-router-redux";
import startsWith from "lodash.startswith";
import axios from "axios";
import get from "lodash.get";

import * as types from "./types";
import * as global from "./global";

const client_id = "ui";
const client_secret = "d3023223c60ae47a0b8fab5e924e19a13a8d82ac";

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

	const url = createTokenRequestUrl(username, password);
	const config = {method: "post"};

	return axios(url, config)
		.then(response => {
			dispatch(save(response.data));
			dispatch(push(route));
		})
		.catch(error => {
			if (error) {
				const status = get(error, "response.status", 0);
				console.debug("log in error", error);
				if (status === 400) {
					dispatch(badCredentials());
				} else {
					dispatch(global.error(error));
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

export const doLogOutWhenUnauthorized = () => dispatch => {
	console.debug("do log-out when unauthorized");

	dispatch(clear());
	dispatch(push("log-in"));
};

const createTokenRequestUrl = (username, password) =>
	URI("/oauth/token")
		.query({
			grant_type: "password",
			client_id,
			client_secret,
			username,
			password
		}).toString();

export const createTokenRefreshUrl = (refresh_token) =>
	URI("/oauth/token")
		.query({
			grant_type: "refresh_token",
			client_id,
			client_secret,
			refresh_token
		}).toString();

export const checkNeedRefresh = (body) => {
	if (body === "") {
		return false;
	} else if (body.error !== "invalid_token") {
		return false;
	} else if (startsWith(body.error_description, "Access token expired:")) {
		return true;
	}
};
