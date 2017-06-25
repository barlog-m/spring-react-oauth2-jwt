export const ERROR_UNKNOWN = "ERROR_UNKNOWN";
export const ERROR_INTERNAL = "ERROR_INTERNAL";
export const ERROR_NETWORK = "ERROR_NETWORK";
export const ERROR_HTTP = "ERROR_HTTP";
export const ERROR_REST = "ERROR_REST";
export const ERROR_AUTH = "ERROR_AUTH";

class Error {
	constructor(type, message, code, data) {
		this.type = type;
		this.message = message;
		this.code = code;
		this.data = data;
	}

	static unknown() {
		return new Error(
			ERROR_UNKNOWN
		);
	}

	static internal(message) {
		return new Error(
			ERROR_INTERNAL,
			message ? message : "Internal error"
		);
	}

	static network(code, message) {
		return new Error(
			ERROR_NETWORK,
			message ? message : "Network error",
			code ? code : "ERROR_UNKNOWN",
		);
	}

	static http(code, message, data) {
		return new Error(
			ERROR_HTTP,
			message ? message : "Unknown http error",
			code ? code : -1,
			data ? data : "",
		);
	}

	static rest(code, message, data) {
		return new Error(
			ERROR_REST,
			message ? message : "Unknown rest error",
			code ? code : -1,
			data ? JSON.parse(data) : {},
		);
	}

	static auth(logout, message) {
		return new Error(
			ERROR_AUTH,
			message ? message : "Authentication error",
			-1,
			logout ? logout: false
		);
	}
};

export default Error;
