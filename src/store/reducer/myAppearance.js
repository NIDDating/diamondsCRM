import {MY_APPEARANCE} from "../actionTypes";
import {myAppearance} from "../initialState";

function reducer(state = myAppearance, action) {
	switch(action.type) {
		case MY_APPEARANCE.SET_VALUE:
			let {value, field} = action.value;
			let newState = {...state};

			newState[field] = value === "null" ? null : parseInt(action.value.value);

			if (field === "gender") {
				newState["etn"] = null;
				newState["hair"] = null;
				newState["hairColor"] = null;
				newState["eyes"] = null;
				newState["chest"] = null;
				newState["booty"] = null;
				newState["body"] = null;
			}

			return newState;
		case MY_APPEARANCE.INCREMENT_CURRENT:
			return {
				...state,
				current: state.current + 1
			};
		case MY_APPEARANCE.DECREMENT_CURRENT:
			return {
				...state,
				current: state.current - 1
			};
		case MY_APPEARANCE.SET_VIEWED:
			return {
				...state,
				viewed: true
			}
		case MY_APPEARANCE.START:
			return {
				...state,
				started: true
			}
		case MY_APPEARANCE.FINISH:
			return {
				...state,
				finished: true
			}
		default:
			return state;
	}
}

export default reducer;