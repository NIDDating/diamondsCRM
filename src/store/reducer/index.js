import {combineReducers} from "redux";
import {GLOBAL} from "../actionTypes";

import partnersAppearance from "./partnersAppearance";
import myAppearance from "./myAppearance";
import aboutPartner from "./aboutPartner";
import aboutMe from "./aboutMe";
import partnersTraits from "./partnersTraits";
import myTraits from "./myTraits";
import test from "./test";
import global from "./global";

const appReducer = combineReducers({
	partnersAppearance,
	myAppearance,
	aboutPartner,
	aboutMe,
	partnersTraits,
	myTraits,
	test,
	global
});

const rootReducer = (state, action) => {
	if (action.type === GLOBAL.CLEAR) {
		return appReducer({
			...state,
			global: {
				...state.global,
				finished: true
			}
		}, action)
	}

	if (action.type === GLOBAL.RESET) {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
}

export default rootReducer;