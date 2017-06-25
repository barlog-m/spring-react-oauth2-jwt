import jwtDecode from "jwt-decode";
import URI from "urijs";

import Error, {ERROR_HTTP} from "../error";
import {backoff} from "../utils/backoff";

import * as connectionSettings from "../config/connection";
import * as oauth from "../config/oauth";
import * as xhr from "../network/xhr";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const requestToken = (username, password) =>
	xhr.request(() => createTokenRequestUrl(username, password));

export const refreshToken = refresh_token =>
	xhr.request(() => createTokenRefreshUrl(refresh_token))
		.then(
			success => {
				setAccessToken(success.data.access_token);
				setRefreshToken(success.data.refresh_token);
				console.debug("refresh token success", success.data.access_token);
				return Promise.resolve(success.data.access_token);
			},
			error => {
				console.error("refresh token error", error);

				switch (error.type) {
					case ERROR_HTTP:
						if (error.code === 401) {
							return Promise.reject(Error.auth(true, error.message));
						} else {
							return Promise.reject(Error.auth(false, error.message));
						}
					default:
						return Promise.reject(Error.auth(false, error.message));
				}
			}
		);

export const createTokenRequestUrl = (username, password) =>
	URI("/oauth/token")
		.query({
			grant_type: "password",
			client_id: oauth.CLIENT_ID,
			client_secret: oauth.CLIENT_SECRET,
			username,
			password
		}).toString();

export const createTokenRefreshUrl = () =>
	URI("/oauth/token")
		.query({
			grant_type: "refresh_token",
			client_id: oauth.CLIENT_ID,
			client_secret: oauth.CLIENT_SECRET,
			refresh_token: getRefreshToken()
		}).toString();

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const setAccessToken = access_token => {
	localStorage.setItem(ACCESS_TOKEN, access_token);
};

export const setRefreshToken = refresh_token => {
	localStorage.setItem(REFRESH_TOKEN, refresh_token);
};

export const setTokens = (access_token, refersh_token) => {
	setAccessToken(access_token);
	setRefreshToken(refersh_token);
};

export const removeAccessToken = () => {
	localStorage.removeItem(ACCESS_TOKEN);
};

export const removeRefreshToken = () => {
	localStorage.removeItem(REFRESH_TOKEN);
};

export const removeTokens = () => {
	removeAccessToken();
	removeRefreshToken();
};

export const isAccessTokenExpired = token => isTokenExpired(token);

export const isRefreshTokenExpired = token => isTokenExpired(token);

export const isTokenExpired = token => {
	if (!token) return true;

	const {exp} = jwtDecode(token);
	// exp in seconds
	// token is expired if lifetime smaller then connection timeout
	return (exp * 1000 - Date.now()) < connectionSettings.TIMEOUT;
};

export const validateToken = () => {
	return new Promise((resolve, reject) => {
		const access_token = getAccessToken();
		if (!access_token) {
			reject(Error.auth(true, "No access token"));
			return;
		}

		const refresh_token = getRefreshToken();
		if (!refresh_token) {
			reject(Error.auth(true, "No refresh token"));
			return;
		}

		if (isAccessTokenExpired(access_token) &&
			!isRefreshTokenExpired(refresh_token)) {

			backoff(
				() => refreshToken(refresh_token),
				{
					attempts: 8,
					minDelay: 1000,
					maxDelay: 10000
				}
			).then(
				success => resolve(success),
				error => reject(error)
			);
		} else if (
			isAccessTokenExpired(access_token) &&
			isRefreshTokenExpired(refresh_token)) {
			reject(Error.auth(true, "All tokens expired"));
		} else {
			resolve(access_token);
		}
	});
};
