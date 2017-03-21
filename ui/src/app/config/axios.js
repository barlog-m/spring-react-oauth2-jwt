import axios from "axios";
import get from "lodash.get";

import * as connectionSettings from "../config/connection";
import * as tokenUtils from "../token";
import * as global from "../actions/global";
import * as auth from "../actions/auth";

const axiosConfig = dispatch => {
	requestInterceptor(dispatch);
	responseInterceptor(dispatch);
};

const requestInterceptor = dispatch => {
	axios.interceptors.request.use(config => {
		config.timeout = connectionSettings.TIMEOUT;
		config.headers["Accept"] = "application/json;charset=UTF-8";
		config.headers["Content-Type"] = "application/json;charset=UTF-8";
		let cancel;
		config.cancelToken = new axios.CancelToken(c => {
			cancel = c;
		});
		let access_token = tokenUtils.getAccessToken();

		// Checking token expiration before any request
		if (access_token && tokenUtils.isAccessTokenExpired()) {
			console.debug("axios: access token expired");

			if (tokenUtils.getRefreshToken() && tokenUtils.isRefreshTokenExpired()) {
				console.debug("axios: refresh token expired");
				dispatch(auth.doLogOut());
				cancel();
				return config;
			} else {
				console.debug("axios: refresh token");
				return tokenUtils.refreshToken()
					.then(success => {
							console.debug("axios: token refresh success", success);
							tokenUtils.setAccessToken(success.access_token);
							tokenUtils.setRefreshToken(success.refresh_token);

							config.headers["Authorization"] = `Bearer ${success.access_token}`;

							return config;
						},
						error => {
							console.debug("axios: token refresh error", error);
							dispatch(auth.doLogOut());
							config.cancelToken = axios.CancelToken;
							cancel();
							return Promise.reject(null);
						}
					);
			}
		} else {
			config.headers["Authorization"] = `Bearer ${access_token}`;
			dispatch(global.busy());
			return config;
		}
	}, error => {
		dispatch(global.ready());
		return Promise.reject(error);
	});
};

const responseInterceptor = dispatch => {
	axios.interceptors.response.use(response => {
		dispatch(global.ready());
		return response;
	}, error => {
		console.debug("axios: error", error);
		dispatch(global.ready());

		// if request cancelled, do not show error dialog
		if (error instanceof axios.Cancel) {
			return Promise.reject(null);
		}

		const status = get(error, "response.status", 0);
		if ((status === 403) || (status === 401)) {
			dispatch(auth.doLogOut());
			return Promise.reject(null);
		}

		return Promise.reject(error);
	});
};

export default axiosConfig;
