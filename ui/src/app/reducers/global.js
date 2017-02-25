import * as types from "../actions/types";

const initState = {
	busy: false,
	error: {}
};

const errorFilter = error => {
	let code = "UNKNOWN";
	let message = "UNKNOWN";

	if (error.hasOwnProperty("response") && typeof error.response != "undefined") {
		code = error.response.status;
		message = error.response.statusText;

	} else if (error.hasOwnProperty("code") && typeof error.code != "undefined") {
		code = error.code;
		message = error.message;
	}

	return {
		code: code,
		message: message,
		error: error
	};
};

const global = (state = initState, action) => {
	switch (action.type) {
		case types.ERROR:
			return {
				...state,
				...{busy: false, error: errorFilter(action.payload)}
			};
		case types.BUSY:
			return {
				...state,
				...{busy: true, error: {}}
			};
		case types.READY:
			return {
				...state,
				...{busy: false, error: {}}
			};
		default:
			return state;
	}
};

export default global;
