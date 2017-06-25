import * as types from "./types";

export const busy = () => ({
	type: types.STATE_BUSY
});

export const ready = () => ({
	type: types.STATE_READY
});

export const error = payload => ({
	type: types.STATE_ERROR,
	payload
});
