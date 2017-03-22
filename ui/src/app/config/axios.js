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

		const cancelRequest = message => {
			dispatch(auth.doLogOut());
			cancel(message);
			return config;
		};

		return tokenUtils.validateToken()
			.then(access_token => {
				config.headers["Authorization"] = `Bearer ${access_token}`;
				return config;
			})
			.catch(error => {
				console.debug("axios: token refresh error", error);
				return cancelRequest("token refresh error");
			});
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

		// log out if unauthorized (401)
		const status = get(error, "response.status", 0);
		if (status === 401) {
			dispatch(auth.doLogOut());
			return Promise.reject(null);
		}

		return Promise.reject(error);
	});
};

export default axiosConfig;
