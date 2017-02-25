import * as types from "../actions/types";

const foo = (state = [], action) => {
	switch (action.type) {
		case types.FOO_RECEIVE_LIST:
			return action.payload;
		default:
			return state;
	}
};

export default foo;
