import * as types from "./types";

export const busy = () => ({
	type: types.BUSY
});

export const ready = () => ({
	type: types.READY
});

export const error = payload => ({
	type: types.ERROR,
	payload
});
