import axios from "axios";
import * as app from "./app";

export const get = (url, action) => dispatch =>
	dispatch(request(url, {data: {}}, action));

export const post = (url, data) => dispatch =>
	dispatch(request(url, {method: "POST", data}));

export const request = (url, config, action, ...actions) => dispatch =>
	axios(url, config)
		.then(response => {
			console.debug("server.request.response", response);

			if (action !== void 0) {
				dispatch(action(response.data));
			}

			actions.forEach(a => {
				dispatch(a);
			});
		})
		.catch(error => {
			console.debug("server.request.error", error);

			if (error) {
				dispatch(app.error(error));
			}
		});
