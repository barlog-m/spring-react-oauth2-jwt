import * as types from "./types";
import * as server from "./server";

const receive = payload => ({
	type: types.FOO_RECEIVE_LIST,
	payload
});

export const getList = () => dispatch =>
	dispatch(server.get("/api/v1/foo", receive));
