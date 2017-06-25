import * as types from "../actions/types";
import * as errorType from "../error";

const initState = {
	busy: false,
	error: ""
};

const getErrorMessage = error => {
	switch (error.type) {
		case errorType.ERROR_UNKNOWN:
			return "Unknown error";
		case errorType.ERROR_INTERNAL:
			return "Internal error";
		case errorType.ERROR_NETWORK:
			return "Network error";
		case errorType.ERROR_HTTP:
			return "HTTP error";
		case errorType.ERROR_REST:
			return "REST error";
		case errorType.ERROR_AUTH:
			return (error.message.toLowerCase().indexOf("network") !== -1)
				? error.message : "Authentication error";
		default:
			return "Error in error processing";
	}
};

const state = (state = initState, action) => {
	switch (action.type) {
		case types.STATE_ERROR:
			return {
				...state,
				...{busy: false, error: getErrorMessage(action.payload)}
			};
		case types.STATE_BUSY:
			return {
				...state,
				...{busy: true, error: ""}
			};
		case types.STATE_READY:
			return {
				...state,
				...{busy: false, error: ""}
			};
		default:
			return state;
	}
};

export default state;
