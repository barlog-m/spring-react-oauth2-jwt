import axios from "axios";
import get from "lodash.get";

import * as connectionSettings from "../config/connection";
import * as busySettings from "../config/busy";
import * as tokenUtils from "../token/token";
import * as app from "../actions/app";
import * as auth from "../actions/auth";

import Error, {ERROR_AUTH} from "../error";

const axiosConfig = dispatch => {
	requestInterceptor(dispatch);
	responseInterceptor(dispatch);
};

const requestInterceptor = dispatch => {
	axios.interceptors.request.use(config => {
		dispatch(app.busy());

		config.timeout = connectionSettings.TIMEOUT;
		config.headers["Accept"] = "application/json;charset=UTF-8";
		config.headers["Content-Type"] = "application/json;charset=UTF-8";

		let cancel;
		config.cancelToken = new axios.CancelToken(c => {
			cancel = c;
		});

		const cancelRequest = message => {
			cancel(message);
			return config;
		};

		return tokenUtils.validateToken()
			.then(access_token => {
				config.headers["Authorization"] = `Bearer ${access_token}`;
				return config;
			})
			.catch(error => {
				console.error("axios validate tokens:", error);
				return cancelRequest(error);
			});
	}, error => {
		console.debug("axios request interceptor error", error);
		return Promise.reject(error);
	});
};

const responseInterceptor = dispatch => {
	axios.interceptors.response.use(response => {
		return pause()
			.then(() => dispatch(app.ready()))
			.then(() => response);
	}, error => {
		console.error("axios response interceptor error", {error});
		return pause()
			.then(() => dispatch(app.ready()))
			.then(() => {
				// if cancelled do log out if set
				if (error instanceof axios.Cancel) {
					if ((error.message.type === ERROR_AUTH)
						&& (error.message.data === true)) {
						dispatch(auth.doLogOut());
						return Promise.reject(null);
					}
					return Promise.reject(error.message);
				}

				// if unauthorized (401) do log out
				const status = get(error, "response.status", 0);
				if (status === 401) {
					dispatch(auth.doLogOut());
					return Promise.reject(null);
				}

				if (error.response === void 0) {
					return Promise.reject(Error.network(
						error.code,
						error.message
					));
				} else {
					return Promise.reject(Error.http(
						error.response.status,
						error.response.statusText,
						error.message
					));
				}

				return Promise.reject(Error.unknown());
			});
	});
};

const pause = () => new Promise(resolve => setTimeout(resolve, busySettings.TIMEOUT));

export default axiosConfig;
