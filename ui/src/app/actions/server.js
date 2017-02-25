import axios from "axios";
import * as global from "./global";

export const get = (url, action) => dispatch =>
	dispatch(request(url, {data: {}}, action));

export const post = (url, data) => dispatch =>
	dispatch(request(url, {method: "POST", data}));

export const request = (url, config, action, ...actions) => dispatch =>
	axios(url, config)
		.then(response => {
			if (action !== void 0) {
				dispatch(action(response.data));
			}

			actions.forEach(a => {
				dispatch(a);
			});
		})
		.catch(error => {
			if (error) {
				console.debug("server.request", error);
				dispatch(global.error(error));
			}
		});
