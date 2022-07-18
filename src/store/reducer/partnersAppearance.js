import {PARTNERS_APPEARANCE} from "../actionTypes";
import {partnersAppearance} from "../initialState";

function reducer(state = partnersAppearance, action) {
	switch(action.type) {
		case PARTNERS_APPEARANCE.SET_VALUE:
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
		case PARTNERS_APPEARANCE.INCREMENT_CURRENT:
			return {
				...state,
				current: state.current + 1
			};
		case PARTNERS_APPEARANCE.DECREMENT_CURRENT:
			return {
				...state,
				current: state.current - 1
			};
		case PARTNERS_APPEARANCE.SET_VIEWED:
			return {
				...state,
				viewed: true
			}
		case PARTNERS_APPEARANCE.START:
			return {
				...state,
				started: true
			}
		case PARTNERS_APPEARANCE.FINISH:
			return {
				...state,
				finished: true
			}
		default:
			return state;
	}
}

export default reducer;