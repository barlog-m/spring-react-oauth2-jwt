import axios from "axios";
import get from "lodash.get";

import * as global from "../actions/global";
import * as auth from "../actions/auth";

const config = dispatch => {
	requestInterceptor(dispatch);
	responseInterceptor(dispatch);
};

const requestInterceptor = dispatch => {
	axios.interceptors.request.use(config => {
		const token = localStorage.getItem("access_token");
		config.timeout = 5000;
		config.headers.common["Accept"] = "application/json;charset=UTF-8";
		config.headers.common["Content-Type"] = "application/json;charset=UTF-8";
		config.headers.common["Authorization"] = `Bearer ${token}`;
		dispatch(global.busy());
		return config;
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
		console.debug("axios interceptor error", error);
		dispatch(global.ready());

		const config = error.config;
		const status = get(error, "response.status", 0);
		const body = get(error, "response.data", "");

		if (status === 401) {
			if (auth.checkNeedRefresh(body) && !config.__isRetryRequest) {
				console.debug("token need to refresh", config);
				config.__isRetryRequest = true;

				const refresh_token = localStorage.getItem("refresh_token");
				return refreshToken(refresh_token)
					.then(success => {
							console.debug("token refresh success", success);
							localStorage.setItem("access_token", success.access_token);
							localStorage.setItem("refresh_token", success.refresh_token);
							config.headers.Authorization = `Bearer ${success.access_token}`;
							return axios(config);
						},
						error => {
							console.debug("token refresh error", error);
							dispatch(auth.doLogOutWhenUnauthorized());
							return Promise.reject(null);
						}
					);
			} else {
				console.debug("401 error but not token refresh", error);
				dispatch(auth.doLogOutWhenUnauthorized());
				return Promise.reject(null);
			}
		}

		console.debug("error without refresh", error);
		return Promise.reject(error);
	});
};

const refreshToken = (refresh_token) => {
	return new Promise((resolve, reject) => {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.timeout = 5000;

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				const data = JSON.parse(xmlHttp.responseText);
				resolve(data);
			} else if (xmlHttp.status >= 400) {
				reject({
						response: {
							status: xmlHttp.status,
							data: JSON.parse(xmlHttp.responseText)
						}
					}
				);
			}
		};
		xmlHttp.ontimeout = error => reject(error);

		xmlHttp.open("POST", auth.createTokenRefreshUrl(refresh_token), true);
		xmlHttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xmlHttp.send();
	});
};

export default config;
