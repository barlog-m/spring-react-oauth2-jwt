import * as types from "../actions/types";

const bar = (state = [], action) => {
	switch (action.type) {
		case types.BAR_RECEIVE_LIST:
			return action.payload;
		default:
			return state;
	}
};

export default bar;
