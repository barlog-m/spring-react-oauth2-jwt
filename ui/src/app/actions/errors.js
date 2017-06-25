import * as server from "./server";

export const bad = () => dispatch =>
	dispatch(server.get("/api/v1/errors/bad", {}));

export const timeout = () => dispatch =>
	dispatch(server.get("/api/v1/errors/timeout", {}));
